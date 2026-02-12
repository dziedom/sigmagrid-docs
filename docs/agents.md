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

# Test API endpoint (may return 402 or 200 with no_data)
curl https://api.sigmagrid.app/v1/signals/SPY
```

## ERC-8004 agent descriptor

SigmaGrid publishes its canonical ERC-8004 agent descriptor at `https://sigmagrid.app/.well-known/agent.json`.
The ERC-8004 on-chain identity for SigmaGrid should point to that URL.

## Discovery endpoints

All discovery files are served at the site root:

- **ERC-8004 descriptor**: [/.well-known/agent.json](/.well-known/agent.json) — Canonical agent registration
- **OpenAPI spec**: [https://api.sigmagrid.app/openapi.yaml](https://api.sigmagrid.app/openapi.yaml) — Full API schema with request/response models
- **LLMs.txt**: [/llms.txt](/llms.txt) — LLM-friendly API description
- **MCP manifest**: [/mcp.json](/mcp.json) — Model Context Protocol tools definition

These files provide a stable contract for integration. The canonical OpenAPI spec is at `https://api.sigmagrid.app/openapi.yaml` and documents all endpoints under `https://api.sigmagrid.app`.

---

## Core ideas for agents

### 1. Use `/v1/signals/{ticker}` as your primary surface

The `/v1/signals/{ticker}` endpoint gives you a consolidated view, including:

- Core mandatory fields:
  - `timestamp`, `ticker`, `fair_value`, `vol_forecast_1h`, `vol_forecast_4h`,
    `regime`, `drift_1h`, `drift_overnight`, `event_next`, `event_impact`, `event_bias`

- Extended signal fields:
  - `fv_upper`, `fv_lower`, `premiums`, `z_score`, `reversion_prob`, `shock_index`

- Optional macro sensitivities:
  - `beta_macro`, `beta_yield`, `beta_dollar`, `beta_vol_index`

Use this for **routing, sizing, and hedging** decisions.

---

### 2. Example agent decision loop (pseudo-code)

```pseudo
loop every 60 seconds:

  sig = GET /v1/signals/SPY

  # Safety: regime + events
  if sig.regime == "HVOL" and sig.event_impact in ["high", "extreme"]:
      reduce_position_size()
      if sig.event_bias == "risk-off":
          close_risk_on_positions()

  # Directional trades
  if sig.drift_1h > 0 and sig.z_score < 1.0:
      open_or_add_long(size = base_size * (1 + sig.drift_1h))

  elif sig.reversion_prob > 0.75 and sig.z_score > 1.5:
      open_mean_reversion_short(size = base_size * sig.reversion_prob)

  # Macro-aware sizing
  macro_intensity = abs(sig.beta_macro) + abs(sig.beta_vol_index)
  if macro_intensity > 1.5:
      apply_leverage_cap()
```

---

### 3. How to interpret key fields

* **`fair_value`, `fv_upper`, `fv_lower`**

  Treat as the institutional anchor for the perp.

  * Price above `fv_upper` + high `reversion_prob` → mean-reversion setup.
  * Price below `fv_lower` + positive `drift_1h` → trend-continuation setup.

* **`regime` & `shock_index`**

  Use as **risk multipliers**:

  * `trend` + low `shock_index` → you can size more aggressively.
  * `HVOL` + high `shock_index` → tighten stops, reduce leverage, or pause.

* **`event_next`, `event_impact`, `event_bias`**

  Use to modify behaviour around macro events:

  * `event_impact: extreme` → shrink risk window before and after the event.
  * `event_bias: risk-off` → avoid opening new risk-on positions.

* **Macro betas (`beta_macro`, `beta_yield`, `beta_dollar`, `beta_vol_index`)**

  Use them as **overlay controls**, not raw trading signals:

  * Large `beta_yield` in a hawkish environment → favour short exposure.
  * Large `beta_vol_index` → automatic volatility-aware position caps.

---

### 4. Understanding API responses

SigmaGrid endpoints return consistent response codes and payloads:

**HTTP 200 with full payload** — Success. The response contains the requested data.

**HTTP 200 with `{status:"no_data"}`** — All data endpoints return HTTP 200 with `{status:"no_data"}` when no data is available for that ticker or time period. This is expected behavior, not an error. Handle gracefully by treating as "neutral" signal or retrying with a different ticker.

**HTTP 404** — Endpoint not found. Check that you're using the correct path (e.g., `/v1/signals/{ticker}`, not `/signals/{ticker}`).

**HTTP 402 Payment Required** — x402 payment flow required. Agents must complete the x402 payment flow before accessing paid data. The response will include payment details.

**HTTP 5xx** — Server error. Retry with exponential backoff.

---

### 5. Consumption model

Each request to `https://api.sigmagrid.app` is:

* paid **per request** in stablecoins via **x402 payment protocol**, and
* authorised at the protocol level (no long-lived API keys).

Agents should:

1. Construct the HTTP call to the relevant endpoint (e.g. `/v1/signals/SPY`), and
2. Complete the x402 payment flow when the endpoint returns 402.

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
