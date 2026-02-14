# Signal Router Agent

Example consumer agent that demonstrates how to integrate with SigmaGrid API, handle x402 payment flows, and make routing decisions based on market signals.

## What This Does

This agent provides a `GET /route?ticker=TSLA` endpoint that:

1. Fetches data from SigmaGrid endpoints:
   - `/v1/signals/{ticker}` - Free teaser (regime + event-risk labels)
   - `/v1/fair-value/{ticker}` - Fair value estimate (0.02 USDC)
   - `/v1/spread/{ticker}` - Cross-venue spread + arbitrage flag (0.02 USDC)

2. Handles edge cases gracefully:
   - HTTP 402 (payment required) - Returns neutral decision with error message
   - HTTP 200 with `{status:"no_data"}` - Returns neutral decision when no data available
   - HTTP 410 (deprecated) - Returns None for deprecated endpoints
   - Network errors - Returns error state

3. Makes routing decisions:
   - `long` - Risk-on regime with arbitrage opportunity or fair value confirmation
   - `short` - Not used in this simple example (extend for your needs)
   - `neutral` - High event risk, risk-off regime, or no clear signal
   - `error` - No data available

## Quick Start

### Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run the agent
python agent.py

# Or with uvicorn directly
uvicorn agent:app --reload --port 8000
```

### Docker

```bash
# Build image
docker build -t signal-router-agent .

# Run container
docker run -p 8000:8000 signal-router-agent
```

### Test the Endpoint

```bash
# Get routing decision for SPY
curl http://localhost:8000/route?ticker=SPY

# Health check
curl http://localhost:8000/health
```

## Example Response

```json
{
  "ticker": "SPY",
  "action": "long",
  "confidence": 0.7,
  "reasoning": "Arbitrage opportunity: hyperliquid -> avantis, spread 18bps",
  "signals": {
    "ticker": "SPY",
    "regime": "risk_on",
    "event_risk": "low",
    "gated_endpoints": {
      "fair_value": "/v1/fair-value/SPY",
      "spread": "/v1/spread/SPY"
    }
  },
  "error": null,
  "timestamp": "2026-02-14T18:00:05Z"
}
```

## Decision Logic

The agent uses a simple rule-based system:

- **Neutral**: `event_risk` is `elevated`/`high` OR `regime` is `risk_off`
- **Long (arb)**: `spread.arbitrage_flag` is true - arb opportunity detected
- **Long (FV)**: Fair value data available with high confidence
- **Long (regime)**: `risk_on` regime with no specific signal
- **Neutral**: No clear signal
- **Error**: No data available (402 payment required or ticker not supported)

**Note**: This is a minimal example. Real agents would implement more sophisticated risk management, position sizing, and signal filtering.

## SigmaGrid Endpoint Pricing

| Endpoint | Price |
|---|---|
| `/v1/signals/{ticker}` | Free (teaser: labels only) |
| `/v1/fair-value/{ticker}` | 0.02 USDC |
| `/v1/spread/{ticker}` | 0.02 USDC |
| `/v1/alpha-snapshot/{ticker}` | 0.03 USDC (all columns) |

See [SigmaGrid API reference](https://sigmagrid.app/docs/api-reference) for all 19 endpoints.

## Integration with SigmaGrid

This agent consumes SigmaGrid API. To use the live API you'll need to:

1. Implement x402 payment flow for paid requests (0.02-0.05 USDC)
2. Handle payment-required responses (HTTP 402)
3. Cache responses appropriately to minimize API calls

See [SigmaGrid agent documentation](https://sigmagrid.app/docs/agents) for full integration details.

## License

This is example code provided for demonstration purposes.
