---
id: fields
title: Fields
sidebar_label: Fields
---

# Fields

SigmaGrid defines a compact, explicit schema designed for agents. Data is organized across endpoint tiers — the free teaser provides labels only, while paid endpoints return numeric data.

---

## Free Teaser Fields (`/v1/signals/{ticker}`)

The free signals endpoint returns directional labels only — no numeric values.

| Field              | Description                                        |
|--------------------|----------------------------------------------------|
| `ticker`           | Underlying symbol (e.g. `SPY`, `QQQ`, `TSLA`)     |
| `regime`           | `risk_on` / `risk_off` / `transitioning`           |
| `event_risk`       | Event-risk level label                             |
| `gated_endpoints`  | Map of paid endpoint paths for numeric data        |

---

## Fair Value Fields (`/v1/fair-value/{ticker}`)

| Field              | Description                                        |
|--------------------|----------------------------------------------------|
| `fair_value`       | Institutional fair-value estimate                  |
| `confidence`       | Confidence score (0-1)                             |
| `source`           | `market_hours` / `futures_adjusted` / `pre_market_blend` |
| per-venue premium  | Premium-to-close in bps, keyed by venue            |

---

## Premium & Spread Fields

**`/v1/premium/{ticker}`** — per-venue premiums and spread summary.

**`/v1/spread/{ticker}`**:

| Field              | Description                                        |
|--------------------|----------------------------------------------------|
| `cheapest_venue`   | Venue with lowest premium                          |
| `richest_venue`    | Venue with highest premium                         |
| `max_spread_bps`   | Maximum spread across venues in basis points       |
| `arbitrage_flag`   | Boolean flag for exploitable spread                |

---

## Funding Fields (`/v1/funding/{ticker}`)

Hyperliquid only — Avantis and Ostium don't support funding rates.

| Field              | Description                                        |
|--------------------|----------------------------------------------------|
| `funding_rate`     | Current funding rate                               |
| `z_score`          | Funding z-score vs historical                      |
| `anomaly_flag`     | Whether funding is anomalous                       |
| `reversion_prob`   | Mean-reversion probability                         |

---

## Regime Fields

**`/v1/regime/{ticker}`**:

| Field              | Description                                        |
|--------------------|----------------------------------------------------|
| `regime`           | `risk_on` / `risk_off` / `transitioning`           |
| VIX context        | VIX level and related context                      |
| `confidence`       | Regime classification confidence                   |

**`/v1/regime-basic/{ticker}`** — adds VIX level, VIX 24h change (points), funding direction.

---

## Event Risk Fields

**`/v1/event-risk/{ticker}`**:

| Field              | Description                                        |
|--------------------|----------------------------------------------------|
| `level`            | Event-risk level (e.g. `elevated`)                 |
| `hours_to_event`   | Hours until next earnings event                    |
| `avg_move_pct`     | Historical average move percentage                 |
| implied vs historical | Assessment of implied vs realized vol           |

**`/v1/events/{ticker}`**:

| Field              | Description                                        |
|--------------------|----------------------------------------------------|
| `event_next`       | Next major event                                   |
| `event_impact`     | Expected impact level                              |
| `event_bias`       | Directional bias: `risk-on` / `risk-off` / `neutral` |
| `risk_level`       | Overall risk level                                 |

---

## Alpha Snapshot Fields (`/v1/alpha-snapshot/{ticker}`)

The richest single-ticker endpoint. Includes all signal columns:

| Field              | Description                                        |
|--------------------|----------------------------------------------------|
| `fair_value`       | Fair value with confidence score and source         |
| per-venue premiums | Premium-to-close in bps per venue                  |
| `vol_forecast_1h`  | 1-hour volatility forecast                         |
| `vol_forecast_4h`  | 4-hour volatility forecast                         |
| `regime`           | `risk_on` / `risk_off` / `transitioning`           |
| event risk fields  | Earnings proximity, historical avg move, implied-vs-historical |
| spread fields      | Cheapest/richest venue, max spread bps, arbitrage flag |
| funding fields     | Funding rates, z-scores, anomaly flags (Hyperliquid only) |
| `beta_macro`       | Sensitivity to broad risk appetite                 |
| `beta_yield`       | Sensitivity to interest rates                      |
| `beta_dollar`      | Sensitivity to USD strength                        |
| `beta_vol_index`   | Sensitivity to volatility regime (VIX-style)       |

---

## Macro Beta Fields (in alpha-snapshot responses)

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
