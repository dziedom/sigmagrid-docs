import React, { useState } from 'react';
import styles from './HowItWorksSection.module.css';

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 'fundamentals',
      label: 'Fundamentals',
      content: {
        title: 'Institutional Equity Models Applied to Crypto Perps',
        intro: "We model the underlying equities using institutional-grade infrastructure, then project fair value onto 24/7 perp markets.",
        items: [
          'Fair value estimate (not just mid-price)',
          'Volatility forecasts (1h, 4h, overnight)',
          'Alpha signals and directional bias',
          'Regime classification (trend, chop, high-vol, low-vol)',
          'Macro sensitivity (beta to rates, dollar, vol index)',
        ],
        aside: "At 3am Saturday, SPY-PERP trades at $586. Our fair value stays at $585.20, anchored to fundamentals. You get a reference point when no one else has one.",
      },
    },
    {
      id: 'divergence',
      label: 'Divergence',
      content: {
        title: 'Cross-Venue Arbitrage Opportunities',
        intro: "Crypto perp venues don't share liquidity. This creates persistent mispricings we quantify in real-time.",
        items: [
          'Premium/discount per venue vs fair value',
          'Divergence z-score with historical context',
          'Mean-reversion probability',
          'Arbitrage flag for exploitable spreads',
        ],
        aside: "Hyperliquid: $585.10 (15bp cheap) / Avantis: $585.60 (35bp rich) / Fair value: $585.25 — 50bp spread opportunity.",
      },
    },
    {
      id: 'regime',
      label: 'Regime & Risk',
      content: {
        title: 'Know When NOT to Trade',
        intro: "Not all market conditions are tradeable. We classify real-time regime and risk indicators.",
        items: [
          'Trend, chop, high-volatility, low-volatility regimes',
          'VIX context and 24h change',
          'Event-risk assessment and earnings proximity',
          'Cross-venue spread anomalies',
        ],
        aside: "Event-risk flags: 'Elevated event risk — consider reducing exposure before announcement.' Protecting capital is alpha.",
      },
    },
    {
      id: 'api',
      label: 'API Access',
      content: {
        title: 'Simple Integration, Pay-Per-Use',
        intro: "No subscriptions. No minimums. No lock-in. x402 micropayments per query.",
        items: [
          'GET /signals/{ticker} — Free teaser (regime + event-risk)',
          'GET /fair-value/{ticker} — Fair value + premiums (0.02 USDC)',
          'GET /alpha-snapshot/{ticker} — Full snapshot (0.03 USDC)',
        ],
        aside: "Integration time: <5 minutes. Any HTTP client works — Python, Node, Rust.",
      },
    },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.kicker}>[ HOW IT WORKS ]</div>
          <h2 className={styles.title}>Four Layers of Intelligence</h2>
        </div>

        <div className={styles.tabsContainer}>
          <div className={styles.tabsHeader}>
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                className={`${styles.tabButton} ${activeTab === idx ? styles.active : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={styles.tabContent}>
            {tabs.map((tab, idx) => (
              <div
                key={tab.id}
                className={`${styles.tabPanel} ${activeTab === idx ? styles.active : ''}`}
              >
                <h3 className={styles.contentTitle}>{tab.content.title}</h3>
                <p className={styles.contentIntro}>{tab.content.intro}</p>

                <div className={styles.itemList}>
                  {tab.content.items.map((item, itemIdx) => (
                    <div key={itemIdx} className={styles.listItem}>
                      <span className={styles.arrow}>&rarr;</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.aside}>
                  <p>{tab.content.aside}</p>
                </div>

                {tab.id === 'api' && (
                  <div className={styles.docsLink}>
                    <a href="/docs/api-reference">View Full API Docs &rarr;</a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
