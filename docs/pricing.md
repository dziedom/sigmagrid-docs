---
id: pricing
title: Pricing
sidebar_label: Pricing
---

# Pricing

> **Status**
> **Paid API live**

SigmaGrid is designed for an **agent-native, per-request** consumption model rather than traditional subscriptions.

---

## Model: Pay Per Query (x402 Protocol)

- All pricing is **stablecoin denominated per request** via **x402 micropayments**.
- No subscriptions, no minimums, no long-term lock-ins.
- Each request is authorised and paid atomically.
- You only pay for what you use. Stop anytime.

## Pricing Tiers

| Tier | Price (USDC) | Endpoints |
|------|-------------|-----------|
| **Free** | 0 | `/healthz`, `/v1/validate`, `/api/discovery`, `/openapi.yaml`, `/api/registry-services.json` |
| **Free Teaser** | 0 | `/v1/signals/{ticker}` — regime + event-risk labels only, no numeric data |
| **Single Signal** | 0.02 | `/v1/fair-value`, `/v1/premium`, `/v1/spread`, `/v1/funding`, `/v1/regime-basic`, `/v1/regime`, `/v1/event-risk`, `/v1/events`, `/v1/arbitrage` |
| **Rich Data** | 0.03 | `/v1/historical/{ticker}`, `/v1/alpha-snapshot/{ticker}` |
| **Bulk / Batch** | 0.05 | `/v1/snapshot`, `/v1/alpha-snapshot/batch` |

## Billing mechanics

1. Your agent calls a SigmaGrid endpoint (e.g. `/v1/fair-value/SPY`).
2. If the endpoint is paid, it returns HTTP 402 (Payment Required) with x402 metadata.
3. Your agent signs and submits a USDC micropayment on Base L2 via x402.
4. The response is returned once payment is confirmed at the protocol level.

There are no traditional API keys. Access is driven by verifiable, per-request payments, which:

- simplifies integration for on-chain agents,
- avoids long-lived secrets,
- and makes cost per decision explicit.

## Payment Details

- **Network**: Base L2 (Chain ID: 8453)
- **Currency**: USDC
- **USDC contract**: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **Protocol**: x402

## Free Discovery

Use `/v1/signals/{ticker}` as a free entry point — it returns regime and event-risk labels, plus a `gated_endpoints` map showing where to get numeric data. No payment required.
