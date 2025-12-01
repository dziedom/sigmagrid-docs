---
id: intro
title: SigmaGrid Overview
sidebar_label: Overview
---

# SigmaGrid — Institutional Fundamentals for Synthetic-Equity Perpetuals

**Public docs live now — Paid API launching Q1 2026**

SigmaGrid is the institutional fundamentals API for 24/7 synthetic-equity perpetuals such as **SPY-PERP**, **QQQ-PERP**, **TSLA-PERP**, and related synthetic-equity markets.

Traditional equity markets operate on robust institutional anchors:

- fair value  
- volatility forecasts  
- drift  
- regime classification  
- event sensitivity  

Crypto synthetic-equity perpetual markets run 24/7 **without** those anchors. That gap leads to:

- persistent cross-venue mispricings  
- unreliable directional signals  
- liquidation cascades around macro events  
- inconsistent funding patterns  
- weak risk controls for agent-driven execution  

**SigmaGrid supplies the missing institutional fundamentals layer.**  
We deliver them as clean, high-signal JSON API feeds designed from day one for AI agents.

- Core mandatory fields are delivered in **real-time** per ticker.  
- Optional macro betas are available as a separate, higher-value layer.  
- Pricing is stablecoin denominated **per request** via **x402** (no keys, no subscriptions).

Base API URL (when live):

```txt
https://api.sigmagrid.app
```

API endpoints are scheduled to go live in Q1 2026. Until then, these docs define the schema, fields, and integration patterns so you can design agents and systems around SigmaGrid in advance.

