---
id: agents
title: Agents & Integration
sidebar_label: For Agents
---

# For Agents & Automated Systems

SigmaGrid is designed to be consumed by **agents, bots, and automated execution systems**, not just humans.

**API live**
Base API URL: `https://api.sigmagrid.app`

## Quick validation checks (2 minutes)

Test that all discovery endpoints are accessible:

```bash
# Check discovery endpoints (should all return 200)
curl -I https://sigmagrid.app/.well-known/agent.json
curl -I https://api.sigmagrid.app/openapi.yaml
curl -I https://sigmagrid.app/llms.txt
curl -I https://sigmagrid.app/mcp.json

# Service validation (public endpoint, free, no payment required)
curl https://api.sigmagrid.app/v1/validate

# Free teaser (returns regime + event-risk labels, no numeric data)
curl https://api.sigmagrid.app/v1/signals/SPY
```

## ERC-8004 agent descriptor

SigmaGrid publishes its canonical ERC-8004 agent descriptor at `https://sigmagrid.app/.well-known/agent.json`.

**Note**: Manifest generation exists but uses a placeholder signing key. No on-chain registration has been completed yet. ERC-8004 support is planned but not yet live.

## Discovery endpoints

All discovery files are served at the site root:

- **ERC-8004 descriptor**: [/.well-known/agent.json](/.well-known/agent.json) — Canonical agent registration (planned, not yet on-chain)
- **OpenAPI spec**: [https://api.sigmagrid.app/openapi.yaml](https://api.sigmagrid.app/openapi.yaml) — Full API schema with request/response models
- **LLMs.txt**: [/llms.txt](/llms.txt) — LLM-friendly API description
- **MCP manifest**: [/mcp.json](/mcp.json) — MCP descriptor (coming soon — skeleton exists, no tools functional yet)

These files provide a stable contract for integration. The canonical OpenAPI spec is at `https://api.sigmagrid.app/openapi.yaml` and documents all endpoints under `https://api.sigmagrid.app`.

---

## Core ideas for agents

### 1. Use `/v1/signals/{ticker}` as your free entry point

The `/v1/signals/{ticker}` endpoint is a **free teaser** — it returns:

- `regime` — risk_on / risk_off / transitioning
- `event_risk` — event-risk level label
- `gated_endpoints` — a map of paid endpoint paths for numeric data

This lets agents discover the API surface without payment. For numeric data (fair value, vol forecasts, premiums), use the paid endpoints.

### 2. Primary paid endpoints for signal consumption

For a full signal picture, use these endpoints:

- `/v1/fair-value/{ticker}` — fair value + confidence + per-venue premium bps (0.02 USDC)
- `/v1/regime/{ticker}` — regime classification with VIX context (0.02 USDC)
- `/v1/event-risk/{ticker}` — earnings event-risk assessment (0.02 USDC)
- `/v1/spread/{ticker}` — cross-venue spread + arbitrage flag (0.02 USDC)
- `/v1/alpha-snapshot/{ticker}` — all columns in one call (0.03 USDC)

For multi-ticker monitoring:

- `/v1/snapshot?tickers=SPY,QQQ,TSLA` — dashboard snapshot (0.05 USDC)

---

### 3. Example agent decision loop (pseudo-code)

```pseudo
loop every 60 seconds:

  # Free: check regime and event risk
  teaser = GET /v1/signals/SPY

  # If high event risk, get details (paid)
  if teaser.event_risk in ["elevated", "high"]:
      event = GET /v1/event-risk/SPY   # 0.02 USDC
      if event.hours_to_event < 2:
          reduce_position_size()

  # Get fair value for pricing decisions (paid)
  fv = GET /v1/fair-value/SPY          # 0.02 USDC

  # Check cross-venue opportunities
  spread = GET /v1/spread/SPY          # 0.02 USDC
  if spread.arbitrage_flag:
      execute_arb(spread.cheapest_venue, spread.richest_venue)

  # Or get everything at once
  alpha = GET /v1/alpha-snapshot/SPY   # 0.03 USDC
  # alpha contains fair_value, regime, premiums, funding, betas, etc.
```

---

### 4. How to interpret key fields

* **`fair_value`, `confidence`, `source`**

  Treat as the institutional anchor for the perp. The `source` field tells you how it was derived (market_hours, futures_adjusted, or pre_market_blend).

* **`regime`**

  Use as a **risk multiplier**:

  * `risk_on` → you can size more aggressively.
  * `risk_off` → tighten stops, reduce leverage.
  * `transitioning` → caution, regime may be shifting.

* **`event_risk`, `hours_to_event`, `avg_move_pct`**

  Use to modify behaviour around macro events:

  * `elevated` or `high` event risk → shrink risk window.
  * Small `hours_to_event` → avoid opening new positions.

* **`spread`, `cheapest_venue`, `richest_venue`, `arbitrage_flag`**

  Direct arbitrage inputs. When `arbitrage_flag` is true, the spread is exploitable.

* **Macro betas (`beta_macro`, `beta_yield`, `beta_dollar`, `beta_vol_index`)**

  Available in `/v1/alpha-snapshot/{ticker}`. Use as **overlay controls**:

  * Large `beta_yield` in a hawkish environment → favour short exposure.
  * Large `beta_vol_index` → automatic volatility-aware position caps.

---

### 5. Understanding API responses

SigmaGrid endpoints return consistent response codes and payloads:

**HTTP 200 with full payload** — Success. The response contains the requested data.

**HTTP 200 with `{status:"no_data"}`** — All data endpoints return HTTP 200 with `{status:"no_data"}` when no data is available for that ticker or time period. This is expected behavior, not an error. Handle gracefully by treating as "neutral" signal or retrying with a different ticker.

**HTTP 404** — Endpoint not found. Check that you're using the correct path (e.g., `/v1/fair-value/{ticker}`, not `/fair-value/{ticker}`).

**HTTP 402 Payment Required** — x402 payment flow required. Agents must complete the x402 payment flow before accessing paid data. The response will include payment details.

**HTTP 410 Gone** — Endpoint deprecated. `/v1/drift/{ticker}` returns 410. Use `/v1/alpha-snapshot/{ticker}` instead.

**HTTP 5xx** — Server error. Retry with exponential backoff.

---

### 6. Consumption model

Each request to `https://api.sigmagrid.app` is:

* paid **per request** in stablecoins via **x402 payment protocol** (except free endpoints), and
* authorised at the protocol level (no long-lived API keys).

Agents should:

1. Start with the free `/v1/signals/{ticker}` to discover endpoints and check regime.
2. Call paid endpoints as needed, completing the x402 payment flow when 402 is returned.

The docs, OpenAPI spec, `llms.txt`, and `mcp.json` provide a **stable contract** for integration.

---

## Validation endpoint

SigmaGrid provides a free validation endpoint for agents, validators, and monitoring systems.

**GET** `https://api.sigmagrid.app/v1/validate`

This endpoint:

- Returns HTTP 200 when the service is reachable
- Requires no payment
- Use before making x402-gated requests to confirm connectivity and discovery

**x402 registry**: For a machine-readable list of service IDs and paths (e.g. for gateways), see [https://api.sigmagrid.app/api/registry-services.json](https://api.sigmagrid.app/api/registry-services.json).
