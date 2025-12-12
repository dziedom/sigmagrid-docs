---
id: fields
title: Fields
sidebar_label: Fields
---

# Fields

SigmaGrid defines a compact, explicit schema designed for agents. There are two layers:

1. **Core Mandatory Fields** — delivered in real-time per ticker.  
2. **Optional High-Value Fields** — macro betas.

---

## Core Mandatory Fields (delivered in real-time)

These fields form the minimum viable fundamentals layer for each supported ticker.

| Field              | Description                                   |
|--------------------|-----------------------------------------------|
| `timestamp`        | ISO 8601 UTC timestamp of the snapshot        |
| `ticker`           | Underlying symbol (e.g. `SPY`, `QQQ`, `TSLA`) |
| `fair_value`       | Institutional fair-value anchor               |
| `vol_forecast_1h`  | 1-hour volatility forecast                    |
| `vol_forecast_4h`  | 4-hour volatility forecast                    |
| `regime`           | `trend` / `chop` / `HVOL` / `LVOL`           |
| `drift_1h`         | 1-hour directional bias                       |
| `drift_overnight`  | Overnight drift forecast                      |
| `event_next`       | Next major macro event                        |
| `event_impact`     | Expected impact: `low` → `extreme`           |
| `event_bias`       | Event tilt: `risk-on` / `risk-off` / `neutral` |

Additional core-adjacent fields used in the `/v1/signals/{ticker}` view:

| Field           | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `fv_upper`      | Upper confidence band around `fair_value`                                  |
| `fv_lower`      | Lower confidence band around `fair_value`                                  |
| `premiums`      | Object keyed by venue (`hyperliquid`, `aevo`, etc.) with perp basis values |
| `z_score`       | Standardised deviation of price vs fair value                               |
| `reversion_prob`| Modelled probability of mean reversion over the short horizon              |
| `shock_index`   | Indicator of current shock regime (0 = none, higher = more stress)         |

These extended fields are present on the consolidated `/v1/signals/{ticker}` endpoint and share the same real-time cadence as the mandatory core.

---

## Optional High-Value Fields

These fields provide compressed macro sensitivity information per ticker. They are derived from internal models but exposed only as **summary betas**.

| Field            | Description                                      |
|------------------|--------------------------------------------------|
| `beta_macro`     | Sensitivity to broad risk appetite               |
| `beta_yield`     | Sensitivity to interest rates                    |
| `beta_dollar`    | Sensitivity to USD strength                      |
| `beta_vol_index` | Sensitivity to volatility regime (e.g. VIX-style) |

You can treat these betas as:

- **Routing inputs** (e.g. suppress risk when `beta_macro` is high and macro regime turns risk-off).  
- **Sizing multipliers** (e.g. shrink trades in high `beta_vol_index` environments).  
- **Hedging hints** (e.g. align overlay hedges to `beta_yield` and `beta_dollar`).

The optional layer is available on eligible plans and can be switched off entirely if you only need the core field set.

