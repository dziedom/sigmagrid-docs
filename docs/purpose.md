---
id: purpose
title: Purpose
sidebar_label: Purpose
---

# Purpose

SigmaGrid exists to provide **institutional-grade fundamentals** for synthetic-equity perpetual markets.

## The problem

Synthetic-equity perps (SPY-PERP, QQQ-PERP, TSLA-PERP, etc.) trade 24/7, cross-venue, and increasingly agent-driven. But unlike listed equities, they typically trade **without**:

- a stable institutional fair-value anchor
- forward-looking volatility forecasts
- regime classification (risk_on vs risk_off vs transitioning)
- explicit event calendars and risk assessments
- cross-venue spread detection

That absence creates structural issues:

- **Cross-venue mispricings** persist longer than they should.
- **Directional signals** are noisy and fragile.
- **Liquidation cascades** cluster around macro events.
- **Funding patterns** become unstable.
- **Risk controls** for agent-driven execution remain weak.

## The SigmaGrid approach

SigmaGrid rebuilds the institutional fundamentals layer for synthetic-equity perps and exposes it as a **machine-readable JSON API**.

- Every supported ticker receives fair value with confidence score and source (market_hours / futures_adjusted / pre_market_blend).
- Per-venue premium-to-close in bps across Hyperliquid, Avantis, and Ostium.
- Volatility forecasts (1h, 4h horizons).
- Regime classification (risk_on / risk_off / transitioning) with VIX context.
- Event risk (earnings proximity, historical avg move, implied-vs-historical assessment).
- Cross-venue spread (cheapest/richest venue, max spread bps, arbitrage flag).
- Funding rates, z-scores, anomaly flags, mean-reversion probability (Hyperliquid only).
- Optional macro sensitivities (`beta_macro`, `beta_yield`, `beta_dollar`, `beta_vol_index`) in alpha-snapshot responses.

All fields are designed so execution engines, risk systems, and AI agents can plug them directly into routing, sizing, and hedging logic.

The goal is simple: make 24/7 synthetic-equity markets behave more like properly anchored institutional products, without forcing every desk to rebuild decades of fundamentals research.
