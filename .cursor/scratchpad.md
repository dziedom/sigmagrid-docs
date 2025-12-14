## Background and Motivation
SigmaGrid’s public discovery descriptors (agent descriptor, ERC-8004 registration, MCP, and OpenAPI) must all advertise the same real, working API contract. Bots and agent runtimes should only discover the 8 public GET endpoints under `https://api.sigmagrid.app` and should always use the non-www canonical domain (`https://sigmagrid.app`).

8004scan’s metadata parser also requires explicit top-level indexing fields in `/.well-known/erc8004.json` (name, description, version, role, endpoints, pricing, and docs links) to successfully index SigmaGrid.

Dec 14, 2025: 8004scan now expects the ERC-8004 `registration-v1` schema shape (top-level `type`, `endpoints`, and `registrations[]` with `agentRegistry` in CAIP-10 format). The live `/.well-known/erc8004.json` needs content updated (URL stays the same) to avoid “Metadata Parse Failed”.

## Key Challenges and Analysis
- Multiple copies of discovery files exist in this repo (`static/`, `public/`, and generated `build/`). Docusaurus serves `static/*` at site root; `build/*` is an artifact.
- `erc8004.json` previously referenced `https://sigmagrid.app/static/openapi.json`, but the canonical OpenAPI spec is served at `/openapi.json`.
- `agent.json` includes a `website` pointing to `https://www.sigmagrid.app`; canonical should be non-www.
- Need to ensure `www.sigmagrid.app/*` redirects to `sigmagrid.app/*` (including `/.well-known/*`).

## High-level Task Breakdown
- [x] Update `agent.json` to advertise exactly 8 capabilities and endpoints under `https://api.sigmagrid.app`.
  - Success: `capabilities[*].endpoint` exactly matches the 8 canonical endpoints and includes pricing note about x402 / potential 402 responses.
- [x] Update `static/.well-known/erc8004.json` to 8004scan-compatible indexing schema (top-level fields + endpoints + pricing + docs links).
  - Success: JSON matches the required schema, is human-readable, and includes explicit links to `/.well-known/agent.json`, `/openapi.json`, and `/mcp.json`.
- [x] Add/adjust `vercel.json` redirect from www -> non-www for all paths.
  - Success: requests to `https://www.sigmagrid.app/.well-known/agent.json` redirect to `https://sigmagrid.app/.well-known/agent.json`.
- [x] Add `scripts/check-bot-contracts.ts` to fetch live descriptors and validate the same 8 paths exist across agent, MCP, and OpenAPI.
  - Success: exits non-zero on mismatch; prints actionable mismatch output.
- [ ] Verify and print HTTP status codes for required URLs.

- [x] Replace `erc8004.json` with ERC-8004 `registration-v1` document (as expected by 8004scan).
  - Success: `static/.well-known/erc8004.json` matches the required JSON exactly; `public/.well-known/erc8004.json` matches byte-for-byte.
- [x] Ensure `/img/logo.png` exists for the `image` field.
  - Success: `static/img/logo.png` exists (served as `https://sigmagrid.app/img/logo.png` after deploy).

## Project Status Board
- [x] Update discovery JSONs (`agent.json`, `erc8004.json`) in source locations
- [x] Make `/.well-known/erc8004.json` 8004scan-indexable (explicit top-level fields)
- [x] Configure www -> non-www redirect
- [x] Add contract consistency check script
- [ ] Run script (locally) and verify live HTTP status codes

- [x] Convert `erc8004.json` to ERC-8004 `registration-v1` schema (8004scan-compatible)
- [x] Add `/img/logo.png` (placeholder) for the registration `image` URL
- [ ] Create git commit: "Fix ERC-8004 registration schema"

## Current Status / Progress Tracking
- Located multiple copies:
  - `static/.well-known/agent.json`, `public/.well-known/agent.json`
  - `static/.well-known/erc8004.json`, `public/.well-known/erc8004.json`
  - `static/mcp.json`, `static/openapi.json`
- Re-shaped `agent.json` (static/public) for 8004scan compatibility:
  - Required top-level fields: `name`, `description`, `version`, `role`, `capabilities`, `endpoints`, `pricing`, `docs`, `contact`
  - No keys, signatures, or chain data
  - API surface remains exactly 8 `/v1/*` endpoints under `https://api.sigmagrid.app`
- Updated `erc8004.json` (static/public/build) to reference:
  - `https://sigmagrid.app/.well-known/agent.json`
  - `https://sigmagrid.app/mcp.json`
  - `https://sigmagrid.app/openapi.json`
- Updated `static/.well-known/erc8004.json` to the 8004scan indexing schema (explicit top-level fields, `endpoints[]`, `pricing`, `docs` links); confirmed it is copied into `build/.well-known/erc8004.json` by `npm run build`.
- Added `www.sigmagrid.app` -> `sigmagrid.app` redirect in `vercel.json`.
- Added `scripts/check-bot-contracts.ts` (live fetch checker).

- Updated `static/.well-known/erc8004.json` and `public/.well-known/erc8004.json` to the exact ERC-8004 `registration-v1` document required by 8004scan (includes `type`, `endpoints[]`, and `registrations[]` with CAIP-10 `agentRegistry`).
- Added `static/img/logo.png` placeholder so `https://sigmagrid.app/img/logo.png` resolves after deploy.

## Executor's Feedback or Assistance Requests
- The contract checker fetches live URLs; it will fail until these repo changes are deployed. Current failure is expected (live `agent.json` still lacks `base_url`).

- Please confirm it’s OK to create the git commit on this branch with message: "Fix ERC-8004 registration schema".

## Lessons
- Docusaurus serves files in `static/` at the site root; prefer editing `static/*` and avoid committing `build/*` artifacts.
- This environment may not include `python`; use `node -e` for small file generation tasks (like writing a tiny PNG from base64).
