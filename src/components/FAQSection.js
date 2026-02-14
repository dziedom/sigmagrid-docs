import React, { useState } from 'react';
import styles from './FAQSection.module.css';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'How is this different from just averaging venue prices?',
      a: "Venue orderbooks reflect supply and demand, not fundamental value. At 3am Saturday, our fair value stays anchored at $585.20 while naive averaging shows $585.75. When markets open, SPY opens at $585.30 — we were 55bp closer because we're anchored to fundamentals.",
    },
    {
      q: 'Why would I pay for this instead of using free data?',
      a: "Free data gives you bid/ask spreads and recent trades. We answer: Is the price rich or cheap? What's the expected drift overnight? Should I widen stops? Is this spread exploitable? Think GPS coordinates vs GPS + traffic + weather + optimal route.",
    },
    {
      q: 'Do you trade based on these signals?',
      a: "No. We're pure infrastructure. We don't trade, take positions, or front-run queries. Our revenue comes from query volume, which grows when signals work. We're aligned with your success.",
    },
    {
      q: "What if my bot's trades move the market?",
      a: "Our fair value is derived from equity fundamentals, not crypto orderbooks. Your trades create temporary arbitrage opportunities that mean-revert. Our fair value moves when underlying fundamentals change, not when you trade.",
    },
    {
      q: 'Can I backtest with historical data?',
      a: "Yes. Pro and Enterprise tiers include historical fair value time series, premium/discount per venue, regime classifications, divergence z-scores, and event flags. Available in CSV, Parquet, or REST API.",
    },
    {
      q: 'How do I know the signals work?',
      a: "Our monitoring dashboard is public and updates hourly. We show all predictions — successes and failures. Fair value accuracy, basis point edge, sample size, breakdowns by ticker and regime. Auditable and verifiable.",
    },
    {
      q: 'What tickers and venues do you support?',
      a: "Tickers: SPY, QQQ, IWM (indices) + TSLA, AAPL, NVDA, META, GOOGL, AMZN, MSFT (MAG7). Venues: Hyperliquid (L1), Avantis (Base via Pyth), Ostium (mainnet). Expanding based on demand.",
    },
    {
      q: 'How fast are the signals?',
      a: "Fair value: real-time (sub-second). Venue pricing: real-time websockets. Regime: every 5s. API latency: typically <50ms. Built for systematic trading and market making, not ultra-HFT.",
    },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.kicker}>[ FAQ ]</div>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
        </div>

        <div className={styles.list}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.item} ${openIndex === index ? styles.open : ''}`}
            >
              <button
                className={styles.question}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.q}</span>
                <span className={styles.chevron}>{openIndex === index ? '\u2212' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className={styles.answer}>
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
