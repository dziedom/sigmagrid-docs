---
id: api-reference
title: API Reference
sidebar_label: API Reference
---

# API Reference

> **Status**
> **API live**
> Base URL: `https://api.sigmagrid.app`

SigmaGrid exposes 19 endpoints across five pricing tiers. The core contract is stable.

## Base URL

```txt
https://api.sigmagrid.app
```

All endpoints below are relative to this base URL.

## API Contract

SigmaGrid exposes a stable `/v1` API contract. The interface and response schemas are stable, allowing agents and systems to integrate with confidence.

**Current status**: The API is live. The contract, endpoint structure, and field schemas are stable.

**Payment model**: Paid endpoints return HTTP 402 (Payment Required). The x402 protocol handles per-request payment authorization. Agents should be prepared to handle HTTP 402 responses and complete the payment flow before retrying requests.

**x402 registry**: For a machine-readable list of service IDs and paths, see [https://api.sigmagrid.app/api/registry-services.json](https://api.sigmagrid.app/api/registry-services.json).

## Authentication & Payments

- Access is pay-per-request, denominated in stablecoins.
- Payments flow via x402.
- No traditional API keys, subscriptions, or minimums are required.
- Each successful request is authorised and paid atomically at the protocol level.

---

## Free Endpoints (no payment required)

### GET /healthz — Health check

Basic health check for uptime monitoring.

### GET /v1/validate — Service validation + supported assets

Free endpoint. Returns service availability and supported assets list. Use to confirm the API is reachable before making paid requests.

**Example**

```
GET /v1/validate HTTP/1.1
Host: api.sigmagrid.app
Accept: application/json
```

### GET /api/discovery — Bot-discoverable API info

Returns a JSON object with bot-discoverable API information.

### GET /openapi.yaml — OpenAPI 3.0 specification

Returns the machine-readable OpenAPI specification for all endpoints.

### GET /api/registry-services.json — Machine-readable service manifest

Returns a machine-readable list of service IDs and paths for x402 gateways.

---

## Free Teaser (no payment, directional labels only)

### GET /v1/signals/\{ticker\} — Regime state + event-risk labels

This is a **free teaser endpoint**. It returns only regime state and event-risk level as text labels. Numeric fair value, vol forecasts, and premiums are **not** included — those are gated behind paid endpoints.

The response includes a `gated_endpoints` map pointing to paid routes:

```json
{
  "ticker": "SPY",
  "regime": "risk_on",
  "event_risk": "low",
  "gated_endpoints": {
    "premium": "/v1/premium/SPY",
    "fair_value": "/v1/fair-value/SPY",
    "spread": "/v1/spread/SPY",
    "funding": "/v1/funding/SPY",
    "regime": "/v1/regime/SPY",
    "event_risk": "/v1/event-risk/SPY",
    "events": "/v1/events/SPY",
    "arbitrage": "/v1/arbitrage/SPY",
    "alpha_snapshot": "/v1/alpha-snapshot/SPY"
  }
}
```

**Path params**

- `ticker` — e.g. SPY, QQQ, TSLA.

---

## Single Signal — 0.02 USDC per request

### GET /v1/fair-value/\{ticker\} — Fair value estimate

Returns fair value estimate, source, confidence score, and per-venue premium-to-close in bps.

**Fields**: `fair_value`, `confidence`, `source` (market_hours / futures_adjusted / pre_market_blend), per-venue premium bps.

---

### GET /v1/premium/\{ticker\} — Cross-venue mispricing

Returns per-venue premiums and spread summary relative to fair value.

---

### GET /v1/spread/\{ticker\} — Cross-venue spread

Returns cheapest venue, richest venue, max spread in bps, and an arbitrage flag.

---

### GET /v1/funding/\{ticker\} — Funding rates

Returns funding rates, z-scores, anomaly flags, and mean-reversion probability. **Hyperliquid only** — Avantis and Ostium don't support funding rates.

---

### GET /v1/regime-basic/\{ticker\} — Risk regime (basic)

Returns risk regime with VIX level, VIX 24h change (points), and funding direction.

---

### GET /v1/regime/\{ticker\} — Regime classification

Returns regime classification (risk_on / risk_off / transitioning) with VIX context and confidence.

---

### GET /v1/event-risk/\{ticker\} — Earnings event-risk

Returns event-risk level, hours to event, and historical average move percentage.

---

### GET /v1/events/\{ticker\} — Event sensitivity

Returns next event, impact level, bias, and risk level.

---

### GET /v1/arbitrage/\{ticker\} — Arbitrage detection

Returns per-venue premiums and funding rates for arbitrage detection.

---

## Rich Data — 0.03 USDC per request

### GET /v1/historical/\{ticker\} — Historical time-series

Returns historical time-series data: fair value, regime, drift, premiums.

**Query params**

- `start` — Start time (ISO 8601 or Unix).
- `end` — End time (ISO 8601 or Unix).
- `limit` — Maximum number of points to return.

---

### GET /v1/alpha-snapshot/\{ticker\} — Full AlphaSnapshot

Returns all signal columns for one ticker — the richest single-ticker endpoint. Includes fair value, regime, premiums, funding, macro betas, and more.

---

## Bulk / Batch — 0.05 USDC per request

### GET /v1/snapshot — Multi-ticker dashboard snapshot

Returns a snapshot for multiple tickers in a single request.

**Query params**

- `tickers` — Comma-separated list of tickers (e.g. `tickers=SPY,QQQ,TSLA`).

---

### GET /v1/alpha-snapshot/batch — Batch AlphaSnapshot

Returns full AlphaSnapshot for multiple tickers.

**Query params**

- `tickers` — Comma-separated list of tickers (e.g. `tickers=TSLA,AAPL`).

---

## Deprecated

### GET /v1/drift/\{ticker\} — Directional bias (removed)

**Returns 410 Gone.** Removed in the 7-signal refactor. Drift data is available inside `/v1/alpha-snapshot/{ticker}` and `/v1/snapshot` responses.

---

## Endpoint Summary Table

| Endpoint | Method | Price | Description |
|---|---|---|---|
| `/healthz` | GET | Free | Health check |
| `/v1/validate` | GET | Free | Service validation + supported assets |
| `/api/discovery` | GET | Free | Bot-discoverable API info |
| `/openapi.yaml` | GET | Free | OpenAPI 3.0 specification |
| `/api/registry-services.json` | GET | Free | Machine-readable service manifest |
| `/v1/signals/{ticker}` | GET | Free | Regime state + event-risk labels (teaser) |
| `/v1/fair-value/{ticker}` | GET | 0.02 USDC | Fair value, confidence, per-venue premium bps |
| `/v1/premium/{ticker}` | GET | 0.02 USDC | Cross-venue mispricing |
| `/v1/spread/{ticker}` | GET | 0.02 USDC | Cross-venue spread + arbitrage flag |
| `/v1/funding/{ticker}` | GET | 0.02 USDC | Funding rates, z-scores, anomaly flags |
| `/v1/regime-basic/{ticker}` | GET | 0.02 USDC | Risk regime + VIX context |
| `/v1/regime/{ticker}` | GET | 0.02 USDC | Regime classification with confidence |
| `/v1/event-risk/{ticker}` | GET | 0.02 USDC | Earnings event-risk |
| `/v1/events/{ticker}` | GET | 0.02 USDC | Event sensitivity |
| `/v1/arbitrage/{ticker}` | GET | 0.02 USDC | Per-venue premiums + funding for arb |
| `/v1/historical/{ticker}` | GET | 0.03 USDC | Historical time-series |
| `/v1/alpha-snapshot/{ticker}` | GET | 0.03 USDC | Full AlphaSnapshot (all columns) |
| `/v1/snapshot` | GET | 0.05 USDC | Multi-ticker dashboard snapshot |
| `/v1/alpha-snapshot/batch` | GET | 0.05 USDC | Batch AlphaSnapshot |
| `/v1/drift/{ticker}` | GET | 410 Gone | Deprecated — use alpha-snapshot |

## Endpoint growth

The 19 endpoints above define the current public surface. Over time, SigmaGrid will add:

- Additional ticker coverage
- More specialised endpoints (e.g. basket views, meta-signals)

Backward compatibility and clear versioning will be maintained as the API surface grows.
