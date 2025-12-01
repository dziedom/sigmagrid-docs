---
id: api-reference
title: API Reference
sidebar_label: API Reference
---

# API Reference

> **Status**  
> **Public docs live now — Paid API launching Q1 2026**  
> Base URL (when live): `https://api.sigmagrid.app`

SigmaGrid exposes a small, opinionated set of endpoints designed for synthetic-equity perpetuals. The number of endpoints will **increase over time**, but the core contract is stable.

## Base URL

```txt
https://api.sigmagrid.app
```

All endpoints below are relative to this base URL.

## Authentication & Payments (planned)

When the API goes live in Q1 2026:

- Access will be pay-per-request, denominated in stablecoins.
- Payments will flow via x402.
- No traditional API keys, subscriptions, or minimums are required.
- Each successful request is authorised and paid atomically at the protocol level.

Implementation details will be published before launch, but you can already design agents around a stateless, per-request billing model.

## Endpoints (coming Q1 2026)

### GET /signals/\{ticker\} — Master consolidated view

The primary endpoint for most use cases. Returns a full signal snapshot for the specified ticker.

**Path params**

- `ticker` — e.g. SPY, QQQ, TSLA.

**Description**

Includes all core mandatory fields, extended signal fields, and optional macro betas (when enabled on your plan).

**Example**

```
GET /signals/SPY HTTP/1.1
Host: api.sigmagrid.app
Accept: application/json
```

#### Example JSON — /signals/SPY

```json
{
  "timestamp": "2026-01-15T18:00:00Z",
  "ticker": "SPY",
  "fair_value": 523.41,
  "fv_upper": 525.10,
  "fv_lower": 521.80,
  "drift_1h": 0.32,
  "drift_overnight": 0.18,
  "regime": "trend",
  "vol_forecast_1h": 0.012,
  "vol_forecast_4h": 0.015,
  "event_next": "FOMC",
  "event_impact": "extreme",
  "event_bias": "risk-off",
  "premiums": {
    "hyperliquid": 0.42,
    "aevo": -0.15
  },
  "z_score": 2.1,
  "reversion_prob": 0.78,
  "shock_index": 0,
  "beta_macro": 1.08,
  "beta_yield": -0.42,
  "beta_dollar": 0.31,
  "beta_vol_index": 0.87
}
```

This sample contains all required fields:

- **Core mandatory fields**: timestamp, ticker, fair_value, vol_forecast_1h, vol_forecast_4h, regime, drift_1h, drift_overnight, event_next, event_impact, event_bias.
- **Extended core fields**: fv_upper, fv_lower, premiums, z_score, reversion_prob, shock_index.
- **Optional macro sensitivities**: beta_macro, beta_yield, beta_dollar, beta_vol_index.

---

### GET /premium/\{ticker\} — Cross-venue arbitrage

Focuses on basis and mispricing for a given ticker across supported venues.

Returns fields such as:

- timestamp
- ticker
- premiums (map of venue → basis vs fair value)
- z_score
- reversion_prob

Use this endpoint when you only care about cross-venue opportunities and do not need the full `/signals/\{ticker\}` payload.

---

### GET /drift/\{ticker\} — Directional bias

Streams the directional component of the signal surface.

Returns:

- timestamp
- ticker
- drift_1h
- drift_overnight
- regime

Ideal for agents that are already running their own volatility or event models but want a clean, external drift surface.

---

### GET /regime/\{ticker\} — Risk sizing

Designed for position sizing and risk constraints.

Returns:

- timestamp
- ticker
- regime (trend / chop / HVOL / LVOL)
- shock_index
- Optional macro betas (when enabled)

---

### GET /events/\{ticker\} — Macro protection

Surfaces the next major macro event and its implied impact on the ticker.

Returns:

- timestamp
- ticker
- event_next
- event_impact
- event_bias

Used for pausing risk, adjusting leverage, or switching execution templates around event windows.

---

### GET /arbitrage/\{ticker\} — Carry + reversion

Focuses on carry, mean reversion, and stress-aware spreads.

Returns:

- timestamp
- ticker
- fair_value
- premiums
- z_score
- reversion_prob
- shock_index

---

## Endpoint growth

The six endpoints above define the initial public surface. Over time, SigmaGrid will add:

- Additional ticker coverage
- More specialised endpoints (e.g. basket views, meta-signals)
- Historical download endpoints for backtesting and calibration

Backward compatibility and clear versioning will be maintained as the API surface grows.

