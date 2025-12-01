---
id: agents
title: Agents & Integration
sidebar_label: For Agents
---

# For Agents & Automated Systems

SigmaGrid is designed to be consumed by **agents, bots, and automated execution systems**, not just humans.

**Public docs live now — Paid API launching Q1 2026**  
Base API URL (when live): `https://api.sigmagrid.app`

---

## Core ideas for agents

### 1. Use `/signals/{ticker}` as your primary surface

The `/signals/{ticker}` endpoint gives you a consolidated view, including:

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

  sig = GET /signals/SPY

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

### 4. Consumption model (Q1 2026 and beyond)

When live, each request to `https://api.sigmagrid.app` will be:

* paid **per request** in stablecoins via **x402 + thirdweb Nexus Gateway**, and
* authorised at the protocol level (no long-lived API keys).

Agents should be prepared to:

1. Construct the HTTP call to the relevant endpoint (e.g. `/signals/SPY`), and
2. Wrap it in the required x402 payment flow once published.

Until launch, the docs, OpenAPI spec, `llms.txt`, and `mcp.json` provide a **stable contract** for integration.

