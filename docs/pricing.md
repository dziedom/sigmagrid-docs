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

- **Pricing varies based on the value of the feed.**  
- All pricing is **stablecoin denominated per request** via **x402 micropayments**.  
- No subscriptions, no minimums, no long-term lock-ins.  
- Each request is authorised and paid atomically.
- You only pay for what you use. Stop anytime.

Conceptually:

- **Core mandatory field snapshots** are priced at a lower tier.  
- **High-value optional fields** (macro betas and enriched views) are priced at a higher tier.  
- You only pay for what each agent actually consumes.

As an indicative anchor (subject to change before launch), a typical request to `/v1/signals/{ticker}` including all fields may be priced around:

```txt
~$0.05 USD equivalent per request
```

The exact per-feed pricing schedule will be published closer to launch, segmented by:

- field layer (core vs extended vs macro betas)
- ticker group (index ETFs vs single names)
- historical vs real-time access

## Billing mechanics

When the API goes live:

1. Your agent calls a SigmaGrid endpoint (e.g. /v1/signals/SPY).
2. The request is wrapped and paid via x402 using stablecoins (e.g. USDC).
3. The x402 protocol handles routing, accounting, and settlement to SigmaGrid.
4. The response is returned only once payment is confirmed at the protocol level.

There are no traditional API keys. Access is driven by verifiable, per-request payments, which:

- simplifies integration for on-chain agents,
- avoids long-lived secrets,
- and makes cost per decision explicit.

## Waitlist

We notify early users as soon as:

- production pricing is finalised, and
- the x402 payment flow is available in a public test environment.

If you want to integrate SigmaGrid into your execution stack or agent framework, join the waitlist via your usual channel (email, Discord, or direct contact) and include:

- your team name,
- expected request volume,
- and which endpoints you expect to use first.

