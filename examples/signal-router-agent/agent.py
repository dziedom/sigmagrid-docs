"""
Signal Router Agent - Example consumer of SigmaGrid API

This agent demonstrates how to consume SigmaGrid endpoints, handle x402 payments,
and make routing decisions based on market signals.
"""

from datetime import datetime
from typing import Optional, Literal
import asyncio
import httpx
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Signal Router Agent",
    description="Example consumer agent that routes trading decisions based on SigmaGrid signals",
    version="1.0.0"
)

# Enable CORS for agent-to-agent communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# SigmaGrid API base URL
SIGMAGRID_API_BASE = "https://api.sigmagrid.app"
SIGMAGRID_DOCS = "https://sigmagrid.app/docs/agents"


class RoutingDecision(BaseModel):
    """Routing decision output"""
    ticker: str
    action: Literal["long", "short", "neutral", "error"]
    confidence: float  # 0.0 to 1.0
    reasoning: str
    signals: Optional[dict] = None
    error: Optional[str] = None
    timestamp: str


async def fetch_sigmagrid_endpoint(endpoint: str, ticker: str) -> Optional[dict]:
    """
    Fetch data from a SigmaGrid endpoint.

    Returns:
        dict if successful, None if 402 (payment required) or 200 with {status:"no_data"}

    All data endpoints return HTTP 200 with {status:"no_data"} when no data is available.
    """
    url = f"{SIGMAGRID_API_BASE}{endpoint.format(ticker=ticker)}"

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(url)

            if response.status_code == 402:
                # Payment required - x402 flow needed
                return None

            if response.status_code == 410:
                # Deprecated endpoint (e.g. /v1/drift)
                return None

            if response.status_code == 200:
                data = response.json()
                # All endpoints return {status:"no_data"} with HTTP 200 when no data
                if isinstance(data, dict) and data.get("status") == "no_data":
                    return None
                return data

            # Other status codes (404, 5xx, etc.) - return None
            return None

    except Exception as e:
        # Network errors, timeouts, etc.
        return None


def make_routing_decision(teaser: Optional[dict], fair_value: Optional[dict], spread: Optional[dict]) -> dict:
    """
    Simple decision rule based on SigmaGrid signals.

    This is a minimal example - real agents would have more sophisticated logic.

    Uses the free teaser for regime/event-risk, and paid endpoints for numeric data.
    """
    # If we don't have the free teaser, can't make a decision
    if not teaser:
        return {
            "action": "error",
            "confidence": 0.0,
            "reasoning": "No signal data available (may require x402 payment or ticker not supported)"
        }

    regime = teaser.get("regime", "unknown")
    event_risk = teaser.get("event_risk", "unknown")

    # Safety check: high event risk or risk_off regime -> neutral
    if event_risk in ["elevated", "high"] or regime == "risk_off":
        return {
            "action": "neutral",
            "confidence": 0.5,
            "reasoning": f"High risk environment (regime: {regime}, event_risk: {event_risk})"
        }

    # If we have spread data, check for arbitrage opportunities
    if spread and spread.get("arbitrage_flag"):
        cheapest = spread.get("cheapest_venue", "unknown")
        richest = spread.get("richest_venue", "unknown")
        max_spread = spread.get("max_spread_bps", 0)
        return {
            "action": "long",
            "confidence": 0.7,
            "reasoning": f"Arbitrage opportunity: {cheapest} -> {richest}, spread {max_spread}bps"
        }

    # If we have fair value data, compare to current pricing
    if fair_value and fair_value.get("fair_value"):
        confidence_score = fair_value.get("confidence", 0.5)
        source = fair_value.get("source", "unknown")
        return {
            "action": "neutral" if confidence_score < 0.5 else "long",
            "confidence": confidence_score,
            "reasoning": f"Fair value anchored (source: {source}, confidence: {confidence_score:.2f})"
        }

    # Default: risk_on regime -> mild long bias
    if regime == "risk_on":
        return {
            "action": "long",
            "confidence": 0.4,
            "reasoning": f"Risk-on regime with no specific signal"
        }

    # Default: neutral
    return {
        "action": "neutral",
        "confidence": 0.3,
        "reasoning": "No clear signal - market in equilibrium"
    }


@app.get("/")
async def root():
    """Metadata endpoint"""
    return {
        "name": "Signal Router Agent",
        "version": "1.0.0",
        "description": "Example consumer agent for SigmaGrid API",
        "endpoints": {
            "route": "/route?ticker=TSLA",
            "health": "/health"
        },
        "sigmagrid_docs": SIGMAGRID_DOCS
    }


@app.get("/health")
async def health():
    """Health check endpoint"""
    return {
        "status": "ok",
        "service": "signal-router-agent",
        "time": datetime.utcnow().isoformat() + "Z"
    }


@app.get("/route", response_model=RoutingDecision)
async def route(
    ticker: str = Query(..., description="Ticker symbol (e.g., SPY, QQQ, TSLA)")
):
    """
    Get routing decision for a ticker based on SigmaGrid signals.

    This endpoint:
    1. Fetches free teaser (regime + event-risk labels)
    2. Fetches paid fair-value and spread data (requires x402)
    3. Returns a routing decision with confidence and reasoning
    """
    # Fetch from SigmaGrid (in parallel)
    # /v1/signals is free; /v1/fair-value and /v1/spread are 0.02 USDC each
    teaser, fair_value, spread = await asyncio.gather(
        fetch_sigmagrid_endpoint("/v1/signals/{ticker}", ticker),
        fetch_sigmagrid_endpoint("/v1/fair-value/{ticker}", ticker),
        fetch_sigmagrid_endpoint("/v1/spread/{ticker}", ticker)
    )

    # Make routing decision
    decision = make_routing_decision(teaser, fair_value, spread)

    # Build response
    response = RoutingDecision(
        ticker=ticker.upper(),
        action=decision["action"],
        confidence=decision["confidence"],
        reasoning=decision["reasoning"],
        signals=teaser if teaser else None,
        error=None if teaser else "No data available (may require x402 payment or ticker not supported)",
        timestamp=datetime.utcnow().isoformat() + "Z"
    )

    return response


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
