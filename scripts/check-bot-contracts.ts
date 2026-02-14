/*
Contract consistency check for SigmaGrid bot discovery.

Runs against the live canonical URLs:
- https://sigmagrid.app/.well-known/agent.json
- https://sigmagrid.app/mcp.json
- https://sigmagrid.app/openapi.json

Usage:
  node --experimental-strip-types scripts/check-bot-contracts.ts
*/

const CANONICAL_SITE = "https://sigmagrid.app";
const CANONICAL_API_BASE = "https://api.sigmagrid.app";

const EXPECTED_CAPABILITIES: Array<{ id: string; path: string }> = [
  { id: "signals.teaser", path: "/v1/signals/{ticker}" },
  { id: "fairvalue.estimate", path: "/v1/fair-value/{ticker}" },
  { id: "premium.arbitrage", path: "/v1/premium/{ticker}" },
  { id: "spread.crossvenue", path: "/v1/spread/{ticker}" },
  { id: "funding.rates", path: "/v1/funding/{ticker}" },
  { id: "regime.basic", path: "/v1/regime-basic/{ticker}" },
  { id: "regime.risk", path: "/v1/regime/{ticker}" },
  { id: "eventrisk.earnings", path: "/v1/event-risk/{ticker}" },
  { id: "events.macro", path: "/v1/events/{ticker}" },
  { id: "arbitrage.carry", path: "/v1/arbitrage/{ticker}" },
  { id: "historical.data", path: "/v1/historical/{ticker}" },
  { id: "alpha.snapshot", path: "/v1/alpha-snapshot/{ticker}" },
  { id: "snapshot.multi", path: "/v1/snapshot" },
  { id: "alpha.batch", path: "/v1/alpha-snapshot/batch" },
];

const EXPECTED_PATHS = EXPECTED_CAPABILITIES.map((c) => c.path);

function asSet(values: string[]): Set<string> {
  return new Set(values);
}

function diffSets(expected: Set<string>, actual: Set<string>) {
  const missing: string[] = [];
  const extra: string[] = [];

  for (const v of expected) {
    if (!actual.has(v)) missing.push(v);
  }
  for (const v of actual) {
    if (!expected.has(v)) extra.push(v);
  }

  missing.sort();
  extra.sort();
  return { missing, extra };
}

function normalizeToPath(value: unknown): string {
  if (typeof value !== "string") return "";
  // Allow either absolute URLs or path-only strings.
  if (value.startsWith("http://") || value.startsWith("https://")) {
    try {
      const u = new URL(value);
      return u.pathname;
    } catch {
      return "";
    }
  }
  // Strip query string if present.
  const q = value.indexOf("?");
  return q === -1 ? value : value.slice(0, q);
}

async function fetchJson(url: string): Promise<any> {
  const res = await fetch(url, {
    headers: {
      "accept": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Fetch failed: ${url} -> HTTP ${res.status}\n${text.slice(0, 500)}`);
  }

  return await res.json();
}

function fail(msg: string): never {
  console.error(msg);
  process.exit(1);
}

function reportSection(title: string) {
  console.log(`\n== ${title} ==`);
}

async function main() {
  const agentUrl = `${CANONICAL_SITE}/.well-known/agent.json`;
  const mcpUrl = `${CANONICAL_SITE}/mcp.json`;
  const openapiUrl = `${CANONICAL_SITE}/openapi.json`;

  const [agent, mcp, openapi] = await Promise.all([
    fetchJson(agentUrl),
    fetchJson(mcpUrl),
    fetchJson(openapiUrl),
  ]);

  // --- Agent descriptor ---
  reportSection("agent.json");

  // Allow both legacy and canonical shapes:
  // - legacy: { base_url: "https://api...." }
  // - canonical: { endpoints: [{ url: "https://api....../v1/..." }, ...] }
  const agentBase =
    typeof agent?.base_url === "string"
      ? agent.base_url
      : (() => {
          const endpoints: any[] = Array.isArray(agent?.endpoints) ? agent.endpoints : [];
          const firstUrl = String(endpoints?.[0]?.url ?? "");
          if (!firstUrl) return "";
          try {
            return new URL(firstUrl).origin;
          } catch {
            return "";
          }
        })();

  if (agentBase !== CANONICAL_API_BASE) {
    fail(`agent.json base_url mismatch\nExpected: ${CANONICAL_API_BASE}\nActual:   ${String(agentBase)}`);
  }

  const caps: any[] = Array.isArray(agent?.capabilities) ? agent.capabilities : [];
  if (caps.length !== EXPECTED_CAPABILITIES.length) {
    fail(`agent.json capabilities count mismatch\nExpected: ${EXPECTED_CAPABILITIES.length}\nActual:   ${caps.length}`);
  }

  const expectedIds = asSet(EXPECTED_CAPABILITIES.map((c) => c.id));
  const actualIds = asSet(caps.map((c) => String(c?.id ?? "")));
  const idDiff = diffSets(expectedIds, actualIds);
  if (idDiff.missing.length || idDiff.extra.length) {
    fail(
      [
        "agent.json capability ids mismatch",
        idDiff.missing.length ? `Missing: ${idDiff.missing.join(", ")}` : "",
        idDiff.extra.length ? `Extra:   ${idDiff.extra.join(", ")}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }

  const endpointEntries: any[] = Array.isArray(agent?.endpoints) ? agent.endpoints : [];
  const actualAgentPathsFromEndpoints = endpointEntries
    .map((e) => normalizeToPath(e?.url ?? e?.endpoint ?? e?.path))
    .filter(Boolean);

  // Prefer the canonical endpoints list when present; fall back to capabilities[].endpoint.
  const actualAgentPaths =
    actualAgentPathsFromEndpoints.length > 0
      ? actualAgentPathsFromEndpoints
      : caps.map((c) => normalizeToPath(c?.endpoint)).filter(Boolean);

  const agentPathDiff = diffSets(asSet(EXPECTED_PATHS), asSet(actualAgentPaths));
  if (agentPathDiff.missing.length || agentPathDiff.extra.length) {
    fail(
      [
        "agent.json endpoints mismatch",
        agentPathDiff.missing.length ? `Missing: ${agentPathDiff.missing.join(", ")}` : "",
        agentPathDiff.extra.length ? `Extra:   ${agentPathDiff.extra.join(", ")}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }

  // Validate id -> endpoint mapping is exact.
  const expectedMap = new Map(EXPECTED_CAPABILITIES.map((c) => [c.id, c.path]));
  for (const c of caps) {
    const id = String(c?.id ?? "");
    const expectedPath = expectedMap.get(id);
    const actualPath = normalizeToPath(c?.endpoint);
    if (!expectedPath || actualPath !== expectedPath) {
      fail(
        `agent.json capability endpoint mismatch for ${id}\nExpected: ${String(expectedPath)}\nActual:   ${actualPath}`,
      );
    }
  }

  console.log("OK: agent.json contract matches expected 14 capabilities.");

  // --- MCP ---
  reportSection("mcp.json");

  const tools: any[] = Array.isArray(mcp?.tools) ? mcp.tools : [];
  if (tools.length !== EXPECTED_PATHS.length) {
    fail(`mcp.json tools count mismatch\nExpected: ${EXPECTED_PATHS.length}\nActual:   ${tools.length}`);
  }

  const actualMcpPaths = tools.map((t) => normalizeToPath(t?.path));
  const mcpDiff = diffSets(asSet(EXPECTED_PATHS), asSet(actualMcpPaths));
  if (mcpDiff.missing.length || mcpDiff.extra.length) {
    fail(
      [
        "mcp.json tool paths mismatch",
        mcpDiff.missing.length ? `Missing: ${mcpDiff.missing.join(", ")}` : "",
        mcpDiff.extra.length ? `Extra:   ${mcpDiff.extra.join(", ")}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }

  console.log("OK: mcp.json endpoint count check passed.");

  // --- OpenAPI ---
  reportSection("openapi.json");

  const pathsObj = openapi?.paths ?? {};
  const actualOpenapiPaths = Object.keys(pathsObj);
  const openapiDiff = diffSets(asSet(EXPECTED_PATHS), asSet(actualOpenapiPaths));
  if (openapiDiff.missing.length || openapiDiff.extra.length) {
    fail(
      [
        "openapi.json paths mismatch",
        openapiDiff.missing.length ? `Missing: ${openapiDiff.missing.join(", ")}` : "",
        openapiDiff.extra.length ? `Extra:   ${openapiDiff.extra.join(", ")}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }

  console.log("OK: openapi.json contract matches expected endpoints.");

  console.log("\nAll bot discovery descriptors match the same API contract.");
}

main().catch((err) => {
  console.error(String(err?.stack ?? err));
  process.exit(1);
});
