# Signal Router Agent

Example consumer agent that demonstrates how to integrate with SigmaGrid API, handle x402 payment flows, and make routing decisions based on market signals.

## What This Does

This agent provides a `GET /route?ticker=TSLA` endpoint that:

1. Fetches data from SigmaGrid endpoints:
   - `/v1/signals/{ticker}` - Consolidated signal snapshot
   - `/v1/drift/{ticker}` - Directional drift surface
   - `/v1/regime/{ticker}` - Regime and risk sizing

2. Handles edge cases gracefully:
   - HTTP 402 (payment required) - Returns neutral decision with error message
   - HTTP 200 with `{status:"no_data"}` - Returns neutral decision when no data available
   - Network errors - Returns error state

3. Makes routing decisions:
   - `long` - Positive drift with low z-score
   - `short` - Negative drift or mean reversion setup
   - `neutral` - High volatility, extreme events, or no clear signal
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
  "confidence": 0.85,
  "reasoning": "Positive drift (0.32) with low z-score (0.8)",
  "signals": {
    "timestamp": "2026-01-15T18:00:00Z",
    "ticker": "SPY",
    "fair_value": 523.41,
    "drift_1h": 0.32,
    "z_score": 0.8,
    "regime": "trend",
    ...
  },
  "error": null,
  "timestamp": "2026-01-15T18:00:05Z"
}
```

## Decision Logic

The agent uses a simple rule-based system:

- **Long**: Positive `drift_1h` (> 0.1) + low `z_score` (< 1.0)
- **Short**: Negative `drift_1h` (< -0.1) OR high `z_score` (> 1.5) with high `reversion_prob` (> 0.7)
- **Neutral**: High volatility regime (`HVOL`) OR extreme event impact OR no clear signal
- **Error**: No data available (402 payment required or ticker not supported)

**Note**: This is a minimal example. Real agents would implement more sophisticated risk management, position sizing, and signal filtering.

## Deployment

### Option 1: Fly.io

```bash
# Install flyctl
# Create fly.toml (see below)

fly launch
fly deploy
```

### Option 2: Railway

```bash
# Connect your repo to Railway
# Railway will auto-detect the Dockerfile
```

### Option 3: Render

```bash
# Connect your repo to Render
# Use Docker deployment option
```

### Option 4: Self-hosted

```bash
# Build and run on your server
docker build -t signal-router-agent .
docker run -d -p 8000:8000 --name router signal-router-agent
```

## ERC-8004 Registration

After deployment, update `.well-known/agent.json` with your actual domain:

```json
{
  "endpoints": [
    {
      "name": "A2A",
      "endpoint": "https://your-actual-domain.com/.well-known/agent.json"
    }
  ]
}
```

Then serve the `.well-known/` directory at your domain root so bots can discover your agent.

## Integration with SigmaGrid

This agent consumes SigmaGrid API. When SigmaGrid launches (Q1 2026), you'll need to:

1. Implement x402 payment flow for authenticated requests
2. Handle payment-required responses (HTTP 402)
3. Cache responses appropriately to minimize API calls

See [SigmaGrid agent documentation](https://sigmagrid.app/docs/agents) for full integration details.

## License

This is example code provided for demonstration purposes.




