import React, { useState } from 'react';
import styles from './FAQSection.module.css';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'How is this different from just averaging venue prices?',
      a: `Venue orderbooks reflect supply and demand, not fundamental value.

Example: At 3am on Saturday, someone market-buys SPY-PERP on Hyperliquid with $50K, pushing the price from $585 to $586 due to thin liquidity.

→ Naive baseline (averaging venues): $585.75
→ Our fair value (institutional model): $585.20

When US markets open Monday, SPY opens at $585.30.

We were 55bp closer because we're anchored to fundamentals, not orderflow noise.

Venue prices tell you where it IS trading.
We tell you where it SHOULD BE trading.`,
    },
    {
      q: 'Why would I pay for this instead of using free data?',
      a: `Free data = raw orderbook snapshots.

You get:
→ Bid/ask spreads
→ Recent trades
→ Funding rates

You don't get:
→ Is the current price rich or cheap?
→ What's the expected drift overnight?
→ Should I widen stops during this regime?
→ Is this cross-venue spread normal or exploitable?

We provide the institutional layer that answers these questions.

Think of it like:
Free data = GPS coordinates
Our data = GPS + traffic + road conditions + weather + optimal route

Both get you there. One gets you there faster and cheaper.`,
    },
    {
      q: 'Do you trade based on these signals?',
      a: `No. We're pure infrastructure.

We don't:
→ Trade crypto perpetuals
→ Take positions against your orders
→ Front-run client queries
→ Compete with our customers

Our business model is selling data, not trading.

Why this matters:
If we traded, we'd have an incentive to provide bad signals to competitors.
Since we don't trade, our only incentive is signal accuracy.

Our revenue comes from query volume.
Query volume grows when signals work.
So we're aligned with your success.`,
    },
    {
      q: "What if my bot's trades move the market against your fair value?",
      a: `Our fair value is derived from equity fundamentals, not crypto perp orderbooks.

Example:
→ Our fair value for SPY-PERP: $585.20 (based on equity models)
→ You buy 1,000 contracts on Hyperliquid
→ Price temporarily moves to $585.40

Did you change SPY's actual fair value? No.
You just created a 20bp arbitrage opportunity that will mean-revert.

Our fair value doesn't move because YOU traded.
It moves when the UNDERLYING FUNDAMENTALS change (macro data, earnings, etc.).

Your trades are signal, not noise.`,
    },
    {
      q: 'Can I backtest strategies with historical data?',
      a: `Yes. Pro and Enterprise tiers include historical data.

Available data:
→ Fair value time series (tick-by-tick)
→ Premium/discount per venue
→ Regime classifications
→ Divergence z-scores
→ Event flags (FOMC, CPI, earnings)
→ Volatility forecasts (actual vs predicted)

Coverage:
→ Pro tier: 12 months
→ Enterprise tier: 24+ months (since inception)

Format:
→ CSV bulk download
→ Parquet for large datasets
→ REST API for programmatic access

Typical use cases:
→ Strategy backtesting
→ Model validation
→ Research and development

[View Data Schema →]`,
    },
    {
      q: 'How do I know the signals actually work?',
      a: `Our monitoring dashboard is public and updates hourly.

You can see:
✓ Fair value accuracy vs naive baseline (win rate %)
✓ Average edge in basis points
✓ Sample size (number of predictions)
✓ Breakdown by ticker, time window, and market regime

We don't cherry-pick results.
We show all predictions, successes and failures.

Methodology is transparent:
1. We make a fair value prediction at time T
2. We compare it to naive cross-venue average
3. We wait 1-hour or 4-hours
4. We measure which was closer to actual price
5. We publish the results

If you don't trust our dashboard, you can validate independently:
→ Download our historical fair value predictions
→ Compare to your own price data
→ Calculate accuracy yourself

Auditable. Transparent. Verifiable.

[View Demo Dashboard →]`,
    },
    {
      q: 'What tickers do you support?',
      a: `Currently covering:

Indices:
→ SPY (S&P 500)
→ QQQ (Nasdaq 100)
→ IWM (Russell 2000)

MAG7 Tech:
→ TSLA (Tesla)
→ AAPL (Apple)
→ NVDA (Nvidia)
→ META (Meta)
→ GOOGL (Alphabet)
→ AMZN (Amazon)
→ MSFT (Microsoft)

Expanding coverage based on demand.
Request a ticker via Discord or support email.`,
    },
    {
      q: 'What venues do you track?',
      a: `We monitor three live venues:

→ Hyperliquid (L1) — full adapter: pricing, funding, spreads
→ Avantis (Base via Pyth) — pricing and premiums
→ Ostium (mainnet, read-only) — pricing only

We track:
→ Mid prices (bid/ask midpoint)
→ Funding rates (Hyperliquid only — Avantis/Ostium don't support funding)
→ Per-venue premium-to-close in bps

And calculate:
→ Premium/discount vs our fair value
→ Cross-venue spread (cheapest/richest venue, max spread bps, arbitrage flag)
→ Funding z-scores and anomaly flags (Hyperliquid)`,
    },
    {
      q: 'How fast are the signals?',
      a: `Update frequency:

Fair value: Real-time (sub-second updates)
Venue pricing: Real-time (websocket feeds)
Regime classification: Every 5 seconds
Divergence z-scores: Every 10 seconds
Event flags: Immediate (as announced)

API latency:
→ Free tier: ~15 minute delay
→ Pro tier: <100ms (typically <50ms)
→ Enterprise tier: <20ms (co-location available)

We're fast enough for:
→ Systematic trading strategies
→ Market making
→ Arbitrage bots

We're NOT built for:
→ Ultra high-frequency trading (sub-millisecond)
→ Latency arbitrage strategies

If you need sub-10ms latency, contact Enterprise sales.`,
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionKicker}>FAQ</div>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className={styles.questionText}>Q: {faq.q}</span>
                <span className={styles.chevron}>{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className={styles.faqAnswer}>
                  <div className={styles.answerText}>
                    {faq.a.split('\n').map((line, lineIdx) => {
                      if (line.trim() === '') return <br key={lineIdx} />;
                      if (line.startsWith('→')) {
                        return (
                          <div key={lineIdx} className={styles.bulletPoint}>
                            {line}
                          </div>
                        );
                      }
                      if (line.startsWith('✓')) {
                        return (
                          <div key={lineIdx} className={styles.checkPoint}>
                            {line}
                          </div>
                        );
                      }
                      if (line.match(/^\[.*\]$/)) {
                        const linkText = line.replace(/[\[\]]/g, '').replace(/\s*→\s*$/, '');
                        const href = line.includes('Dashboard') ? '/dashboard' : '/docs/api-reference';
                        return (
                          <div key={lineIdx} className={styles.linkPoint}>
                            <a href={href}>{linkText} →</a>
                          </div>
                        );
                      }
                      return (
                        <p key={lineIdx} className={styles.answerParagraph}>
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
