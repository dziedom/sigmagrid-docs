import React, { useState } from 'react';
import styles from './HowItWorksSection.module.css';

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 'fundamentals',
      label: 'Fundamentals Layer',
      icon: '📊',
      color: '#3b82f6',
      content: {
        title: 'Institutional Equity Models Applied to Crypto Perps',
        intro: "We don't trade crypto perpetuals ourselves. We model the underlying equities using institutional-grade infrastructure, then project fair value onto 24/7 perp markets.",
        whatYouGet: [
          'Fair value estimate (not just mid-price)',
          'Volatility forecasts (1h, 4h, overnight windows)',
          'Drift estimates (directional bias)',
          'Regime classification (trend, chop, high-vol, low-vol)',
          'Macro sensitivity (beta to rates, dollar, vol index)',
        ],
        whyItMatters: "At 3am on Saturday, SPY-PERP might trade at $586 due to thin liquidity. Our fair value stays anchored at $585.20 (based on Friday's close, futures pricing, and overnight macro moves). You get a reference point when no one else has one.",
      },
    },
    {
      id: 'divergence',
      label: 'Divergence Detection',
      icon: '🔍',
      color: '#8b5cf6',
      content: {
        title: 'Cross-Venue Arbitrage Opportunities',
        intro: "Crypto perp venues don't share liquidity. This creates persistent mispricings.",
        example: {
          title: 'Example:',
          venues: [
            { name: 'Hyperliquid SPY-PERP', price: '$585.10', status: 'cheap', diff: '15bp' },
            { name: 'Avantis SPY-PERP', price: '$585.60', status: 'rich', diff: '35bp' },
            { name: 'Our fair value', price: '$585.25', status: 'anchor', diff: null },
          ],
          conclusion: 'Mean-reversion opportunity: 50bp spread',
        },
        weCalculate: [
          'Premium/discount per venue (vs fair value)',
          'Divergence z-score (historical context)',
          'Mean-reversion probability',
          'Funding-adjusted expected returns',
        ],
        tagline: 'Trade the inefficiency, not the noise.',
      },
    },
    {
      id: 'regime',
      label: 'Regime & Risk',
      icon: '⚠️',
      color: '#f59e0b',
      content: {
        title: 'Know When NOT to Trade',
        intro: 'Not all market conditions are tradeable.',
        regimeTypes: [
          { type: 'Trend', desc: 'Strong directional momentum' },
          { type: 'Chop', desc: 'Mean-reverting range' },
          { type: 'High-volatility', desc: 'Elevated risk, widen stops' },
          { type: 'Low-volatility', desc: 'Tight ranges, reduce size' },
        ],
        structuralStress: [
          'Microstructure breakdown (orderbook degradation)',
          'Transition probability (regime about to shift?)',
          'Shock index (elevated tail risk)',
        ],
        suppression: "Suppression triggers auto-flag: 'Market conditions unsuitable for systematic strategies. Recommended action: reduce exposure.'",
        tagline: 'Protecting capital is alpha.',
      },
    },
    {
      id: 'api',
      label: 'API Access',
      icon: '💻',
      color: '#22c55e',
      content: {
        title: 'Simple Integration, Pay-Per-Use',
        intro: 'No subscriptions. No minimums. No lock-in.',
        endpoints: [
          { method: 'GET', path: '/signals/{ticker}', desc: 'Returns: fair_value, vol_forecast, drift, regime, premiums, divergence' },
          { method: 'GET', path: '/premium/{ticker}', desc: 'Returns: per-venue premium, z-score, mean-reversion probability' },
          { method: 'GET', path: '/arbitrage/{ticker}', desc: 'Returns: funding-adjusted basis, expected carry, macro-adjusted premium' },
        ],
        auth: 'Authentication: x402 micropayments',
        cost: 'Cost: $0.0001 - $0.01 per query (depending on endpoint)',
        integration: 'Integration time: <5 minutes',
        language: 'Language support: Any HTTP client (Python, Node, Rust, etc.)',
        docsLink: 'View Full API Docs →',
      },
    },
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionKicker}>How It Works</div>
          <h2 className={styles.sectionTitle}>Four Layers of Intelligence</h2>
        </div>

        <div className={styles.tabsContainer}>
          <div className={styles.tabsHeader}>
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                className={`${styles.tabButton} ${activeTab === idx ? styles.active : ''}`}
                onClick={() => setActiveTab(idx)}
                style={{
                  '--tab-color': tab.color,
                  borderBottomColor: activeTab === idx ? tab.color : 'transparent',
                }}
              >
                <span className={styles.tabIcon}>{tab.icon}</span>
                <span className={styles.tabLabel}>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className={styles.tabContent}>
            {tabs.map((tab, idx) => (
              <div
                key={tab.id}
                className={`${styles.tabPanel} ${activeTab === idx ? styles.active : ''}`}
                style={{ '--tab-color': tab.color }}
              >
                <h3 className={styles.contentTitle}>{tab.content.title}</h3>
                <p className={styles.contentIntro}>{tab.content.intro}</p>

                {tab.id === 'fundamentals' && (
                  <div className={styles.fundamentalsContent}>
                    <div className={styles.whatYouGet}>
                      <h4>What you get:</h4>
                      <ul>
                        {tab.content.whatYouGet.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <span className={styles.arrow}>→</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.whyItMatters}>
                      <h4>Why it matters:</h4>
                      <p>{tab.content.whyItMatters}</p>
                    </div>
                  </div>
                )}

                {tab.id === 'divergence' && (
                  <div className={styles.divergenceContent}>
                    <div className={styles.example}>
                      <h4>{tab.content.example.title}</h4>
                      <div className={styles.venueList}>
                        {tab.content.example.venues.map((venue, venueIdx) => (
                          <div key={venueIdx} className={styles.venueItem}>
                            <span className={styles.venueName}>{venue.name}:</span>
                            <span className={styles.venuePrice}>{venue.price}</span>
                            {venue.status === 'cheap' && (
                              <span className={styles.venueStatus} style={{ color: '#22c55e' }}>
                                {venue.diff} cheap
                              </span>
                            )}
                            {venue.status === 'rich' && (
                              <span className={styles.venueStatus} style={{ color: '#f59e0b' }}>
                                {venue.diff} rich
                              </span>
                            )}
                            {venue.status === 'anchor' && (
                              <span className={styles.venueStatus} style={{ color: '#3b82f6' }}>
                                anchor
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      <p className={styles.conclusion}>{tab.content.example.conclusion}</p>
                    </div>
                    <div className={styles.weCalculate}>
                      <h4>We calculate:</h4>
                      <ul>
                        {tab.content.weCalculate.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <span className={styles.arrow}>→</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className={styles.tagline}>{tab.content.tagline}</p>
                  </div>
                )}

                {tab.id === 'regime' && (
                  <div className={styles.regimeContent}>
                    <div className={styles.regimeTypes}>
                      <h4>We classify real-time market regime:</h4>
                      <div className={styles.regimeGrid}>
                        {tab.content.regimeTypes.map((regime, regimeIdx) => (
                          <div key={regimeIdx} className={styles.regimeCard}>
                            <div className={styles.regimeType}>{regime.type}</div>
                            <div className={styles.regimeDesc}>{regime.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={styles.structuralStress}>
                      <h4>Plus structural stress indicators:</h4>
                      <ul>
                        {tab.content.structuralStress.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <span className={styles.arrow}>→</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.suppression}>
                      <p>{tab.content.suppression}</p>
                    </div>
                    <p className={styles.tagline}>{tab.content.tagline}</p>
                  </div>
                )}

                {tab.id === 'api' && (
                  <div className={styles.apiContent}>
                    <div className={styles.endpoints}>
                      {tab.content.endpoints.map((endpoint, endpointIdx) => (
                        <div key={endpointIdx} className={styles.endpointItem}>
                          <div className={styles.endpointMethod}>{endpoint.method}</div>
                          <code className={styles.endpointPath}>{endpoint.path}</code>
                          <div className={styles.endpointDesc}>{endpoint.desc}</div>
                        </div>
                      ))}
                    </div>
                    <div className={styles.apiDetails}>
                      <p><strong>Authentication:</strong> {tab.content.auth}</p>
                      <p><strong>Cost:</strong> {tab.content.cost}</p>
                      <p><strong>Integration time:</strong> {tab.content.integration}</p>
                      <p><strong>Language support:</strong> {tab.content.language}</p>
                    </div>
                    <div className={styles.docsLink}>
                      <a href="/docs/api-reference">{tab.content.docsLink}</a>
                    </div>
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
