---
id: quickstart
title: Quickstart
sidebar_position: 2
---

# Quickstart — From Zero to Signals in 60 Seconds

No signup. No API keys. No SDK installation. Just `curl`.

## Step 1: Check the API is alive

```bash
curl -s https://api.sigmagrid.app/healthz | python3 -m json.tool
```

Expected response:

```json
{
  "status": "ok",
  "service": "sigmagrid-api",
  "version": "1.0.0"
}
```

## Step 2: Discover supported tickers

```bash
curl -s https://api.sigmagrid.app/v1/validate | python3 -m json.tool
```

Returns the full list of supported assets (`SPY`, `QQQ`, `TSLA`, `NVDA`, etc.), venues (`hyperliquid`, `avantis`, `ostium`), and pricing info.

## Step 3: Get your first free signal

```bash
curl -s https://api.sigmagrid.app/v1/signals/SPY | python3 -m json.tool
```

This returns regime state and event-risk level — completely free, no payment required:

```json
{
  "ticker": "SPY",
  "regime": "risk_on",
  "event_risk": "low",
  "gated_endpoints": {
    "fair_value": "/v1/fair-value/SPY",
    "premium": "/v1/premium/SPY",
    "spread": "/v1/spread/SPY",
    "alpha_snapshot": "/v1/alpha-snapshot/SPY"
  }
}
```

The `gated_endpoints` map tells your bot exactly which paid routes to hit next.

## Step 4: Understand the decision loop

```
┌─────────────────────────────┐
│  1. GET /v1/signals/{ticker} │  FREE
│     → regime, event_risk     │
└──────────────┬──────────────┘
               │
       ┌───────▼───────┐
       │  Regime check  │
       └───────┬───────┘
               │
    ┌──────────▼──────────┐
    │ risk_on + low_event  │──→ Normal sizing, proceed
    │ risk_off + high_event│──→ Reduce exposure
    │ transitioning        │──→ Tighten stops
    └──────────┬──────────┘
               │
    ┌──────────▼──────────────────┐
    │  2. GET /v1/fair-value/SPY   │  $0.02 USDC
    │     → fair_value, confidence │
    └──────────┬──────────────────┘
               │
    ┌──────────▼──────────────────┐
    │  3. Compare fair_value vs    │
    │     market price             │
    │     → CHEAP = long           │
    │     → RICH  = short          │
    └──────────┬──────────────────┘
               │
    ┌──────────▼──────────────────┐
    │  4. GET /v1/spread/SPY       │  $0.02 USDC
    │     → cheapest venue         │
    │     → arb_flag               │
    └──────────┬──────────────────┘
               │
    ┌──────────▼──────────────────┐
    │  5. Execute on best venue    │
    └─────────────────────────────┘
```

## Step 5: Full signal in one call (best value)

If you want everything at once, use the AlphaSnapshot:

```bash
curl -s https://api.sigmagrid.app/v1/alpha-snapshot/SPY
```

This returns **every signal** — fair value, premiums, regime, funding, events, drift, vol forecast — for `$0.03 USDC`. Best value for comprehensive decisions.

## Python Example

```python
import requests

# Step 1: Free teaser — check regime before spending
teaser = requests.get("https://api.sigmagrid.app/v1/signals/SPY").json()
print(f"Regime: {teaser['regime']}, Event Risk: {teaser['event_risk']}")

# Step 2: If regime is favorable, get full snapshot (paid via x402)
if teaser["regime"] == "risk_on" and teaser["event_risk"] == "low":
    # x402 payment flow would go here
    # For now, this shows the pattern
    snapshot_url = f"https://api.sigmagrid.app{teaser['gated_endpoints']['alpha_snapshot']}"
    print(f"Would query: {snapshot_url}")
```

## Node.js Example

```javascript
const response = await fetch('https://api.sigmagrid.app/v1/signals/SPY');
const teaser = await response.json();

console.log(`Regime: ${teaser.regime}`);
console.log(`Event Risk: ${teaser.event_risk}`);

// Decide next action based on regime
if (teaser.regime === 'risk_on') {
  console.log('Favorable regime — proceed to paid signals');
  // x402 payment flow for: GET /v1/alpha-snapshot/SPY
} else {
  console.log('Risk-off regime — reduce exposure');
}
```

## Payment: How x402 Works

SigmaGrid uses **x402 micropayments** — pay per request, no subscription:

1. Call a paid endpoint (e.g., `/v1/fair-value/SPY`)
2. Receive `HTTP 402` with payment instructions (price, recipient, chain)
3. Sign a USDC payment on **Base L2** (Chain ID 8453)
4. Retry the request with the payment proof in the header
5. Receive your signal data

**Cost breakdown:**
- Free: `/healthz`, `/v1/validate`, `/v1/signals/{ticker}`
- `$0.02 USDC`: Individual signal endpoints
- `$0.03 USDC`: AlphaSnapshot, historical data
- `$0.05 USDC`: Batch/multi-ticker endpoints

## Discovery for Agents

Your bot can auto-discover SigmaGrid through these standard protocols:

| Protocol | URL |
|----------|-----|
| OpenAPI 3.1 | `https://api.sigmagrid.app/openapi.yaml` |
| MCP | `https://sigmagrid.app/.well-known/mcp.json` |
| Agent Descriptor | `https://sigmagrid.app/.well-known/agent.json` |
| llms.txt | `https://sigmagrid.app/llms.txt` |
| ERC-8004 | `https://sigmagrid.app/.well-known/erc8004.json` |

## Next Steps

- **[API Reference](/docs/api-reference)** — Full endpoint documentation
- **[Field Reference](/docs/fields)** — Every field explained
- **[For Agents](/docs/agents)** — Agent-specific integration guide
- **[Dashboard](/dashboard)** — Live signal visualization
