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


def make_routing_decision(signals: Optional[dict], drift: Optional[dict], regime: Optional[dict]) -> dict:
    """
    Simple decision rule based on SigmaGrid signals.
    
    This is a minimal example - real agents would have more sophisticated logic.
    """
    # If we don't have signals, can't make a decision
    if not signals:
        return {
            "action": "error",
            "confidence": 0.0,
            "reasoning": "No signal data available (may require x402 payment or ticker not supported)"
        }
    
    # Extract key fields
    drift_1h = signals.get("drift_1h", 0.0)
    z_score = signals.get("z_score", 0.0)
    reversion_prob = signals.get("reversion_prob", 0.0)
    regime_val = signals.get("regime", "unknown")
    event_impact = signals.get("event_impact", "low")
    
    # Safety check: high volatility or extreme events -> neutral
    if regime_val == "HVOL" or event_impact in ["high", "extreme"]:
        return {
            "action": "neutral",
            "confidence": 0.5,
            "reasoning": f"High risk environment (regime: {regime_val}, event_impact: {event_impact})"
        }
    
    # Directional bias: positive drift + low z-score -> long
    if drift_1h > 0.1 and z_score < 1.0:
        confidence = min(0.7 + abs(drift_1h) * 0.3, 0.95)
        return {
            "action": "long",
            "confidence": confidence,
            "reasoning": f"Positive drift ({drift_1h:.3f}) with low z-score ({z_score:.2f})"
        }
    
    # Mean reversion: high z-score + high reversion prob -> short
    if z_score > 1.5 and reversion_prob > 0.7:
        confidence = min(0.6 + reversion_prob * 0.3, 0.9)
        return {
            "action": "short",
            "confidence": confidence,
            "reasoning": f"Mean reversion setup (z-score: {z_score:.2f}, reversion_prob: {reversion_prob:.2f})"
        }
    
    # Negative drift -> short
    if drift_1h < -0.1:
        confidence = min(0.6 + abs(drift_1h) * 0.3, 0.9)
        return {
            "action": "short",
            "confidence": confidence,
            "reasoning": f"Negative drift ({drift_1h:.3f})"
        }
    
    # Default: neutral
    return {
        "action": "neutral",
        "confidence": 0.4,
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
    1. Fetches signals, drift, and regime from SigmaGrid
    2. Handles 402 (payment required) and no_data responses gracefully
    3. Returns a routing decision with confidence and reasoning
    """
    # Fetch from SigmaGrid (in parallel)
    signals, drift, regime = await asyncio.gather(
        fetch_sigmagrid_endpoint("/v1/signals/{ticker}", ticker),
        fetch_sigmagrid_endpoint("/v1/drift/{ticker}", ticker),
        fetch_sigmagrid_endpoint("/v1/regime/{ticker}", ticker)
    )
    
    # Make routing decision
    decision = make_routing_decision(signals, drift, regime)
    
    # Build response
    response = RoutingDecision(
        ticker=ticker.upper(),
        action=decision["action"],
        confidence=decision["confidence"],
        reasoning=decision["reasoning"],
        signals=signals if signals else None,
        error=None if signals else "No data available (may require x402 payment or ticker not supported)",
        timestamp=datetime.utcnow().isoformat() + "Z"
    )
    
    return response


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)




