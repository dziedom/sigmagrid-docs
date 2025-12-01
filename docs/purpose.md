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
- consistent drift estimates  
- regime classification (trend vs chop, high-vol vs low-vol)  
- explicit event calendars and sensitivities  

That absence creates structural issues:

- **Cross-venue mispricings** persist longer than they should.  
- **Directional signals** are noisy and fragile.  
- **Liquidation cascades** cluster around macro events.  
- **Funding patterns** become unstable.  
- **Risk controls** for agent-driven execution remain weak.

## The SigmaGrid approach

SigmaGrid rebuilds the institutional fundamentals layer for synthetic-equity perps and exposes it as a **machine-readable JSON API**.

- Every supported ticker receives a **real-time snapshot** of mandatory fields: fair value, volatility forecasts, drift, regime, and macro event context.  
- Optional macro sensitivities (`beta_macro`, `beta_yield`, `beta_dollar`, `beta_vol_index`) compress complex relationships into a compact, safe-to-expose signal surface.  
- All fields are designed so execution engines, risk systems, and AI agents can plug them directly into routing, sizing, and hedging logic.

The goal is simple: make 24/7 synthetic-equity markets behave more like properly anchored institutional products, without forcing every desk to rebuild decades of fundamentals research.

