---
id: intro
title: SigmaGrid Overview
sidebar_label: Overview
---

# SigmaGrid — Institutional Fair Value for Crypto Perpetual Markets

**API live**

Traditional equity markets close at 4pm. Crypto synthetic equity perps trade 24/7.

**Get institutional-grade fair value when Bloomberg terminals go dark.**

SigmaGrid is the institutional fundamentals API for 24/7 synthetic-equity perpetuals such as **SPY-PERP**, **QQQ-PERP**, **TSLA-PERP**, and related synthetic-equity markets.

## The 24/7 Fair Value Problem

Crypto synthetic equity perpetuals trade around the clock across Hyperliquid, Avantis, and Ostium. But institutional fundamentals only exist during market hours (9:30am-4pm ET, Mon-Fri).

At 2am on Sunday, what's the fair value of SPY-PERP?

- Bloomberg Terminal: Offline
- Institutional desks: Closed
- Analyst coverage: Dark
- Your trading bot: Flying blind

Without a fundamental anchor, you're trading against orderbook noise:
- Overpay during thin liquidity
- Miss mean-reversion opportunities
- Get liquidated on event-driven moves
- Can't distinguish rich vs cheap

Traditional markets have institutional infrastructure. Crypto perps have been guessing. **Until now.**

## The Solution

**SigmaGrid supplies the missing institutional fundamentals layer.**  
We apply traditional equity derivatives models to crypto perpetual markets, providing the fundamental anchor that's been missing from DeFi.

We don't just show you orderbook prices. **We tell you what the price should be.**

We deliver them as clean, high-signal JSON API feeds designed from day one for AI agents.

- Core mandatory fields are delivered in **real-time** per ticker.  
- Optional macro betas are available as a separate, higher-value layer.  
- Pricing is stablecoin denominated **per request** via **x402** (no keys, no subscriptions).

Base API URL:

```txt
https://api.sigmagrid.app
```

The API is live. These docs define the schema, fields, and integration patterns for agents and systems.

