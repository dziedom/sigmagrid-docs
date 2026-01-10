import React from 'react';
import styles from './SolutionSection.module.css';

export default function SolutionSection() {
  const features = [
    {
      icon: '📊',
      title: 'Fair Value Anchors',
      description: 'Real-time institutional fair value for SPY, QQQ, IWM (indices) and TSLA, AAPL, NVDA, META, GOOGL, AMZN, MSFT (MAG7).',
      details: [
        'Based on equity market fundamentals',
        'Volatility surface modeling',
        'Macro sensitivity coefficients',
        'Drift and regime analysis',
      ],
      note: 'Updated every second, even when traditional markets are closed.',
      color: '#3b82f6',
    },
    {
      icon: '🔍',
      title: 'Cross-Venue Intelligence',
      description: 'Track pricing across all major venues: Hyperliquid, Avantis, Aevo, Drift, Vertex.',
      details: [
        'Which venue is mispricing vs fair value',
        'Premium compression opportunities',
        'Funding-adjusted arbitrage',
        'Divergence z-scores (cross-venue spread)',
      ],
      note: 'Spot inefficiencies before the market corrects.',
      color: '#8b5cf6',
    },
    {
      icon: '⚠️',
      title: 'Event Risk Protection',
      description: 'Automated suppression triggers for high-impact events: FOMC rate decisions, CPI/inflation releases, quarterly earnings, geopolitical shocks.',
      details: [
        'Event countdown timers',
        'Expected impact classification',
        'Directional bias (risk-on/risk-off)',
        'Volatility forecasts (1h, 4h, overnight)',
      ],
      note: 'Trade smarter around macro catalysts.',
      color: '#f59e0b',
    },
  ];

  return (
    <section className={styles.solutionSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionKicker}>The Solution</div>
          <h2 className={styles.sectionTitle}>Institutional Fundamentals, 24/7</h2>
          <p className={styles.sectionDescription}>
            SigmaGrid applies traditional equity derivatives models to crypto perpetual markets, providing the fundamental anchor that's been missing from DeFi.
          </p>
          <p className={styles.sectionTagline}>
            We don't just show you orderbook prices.
            <br />
            <strong>We tell you what the price should be.</strong>
          </p>
        </div>

        <div className={styles.featureGrid}>
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={styles.featureCard}
              style={{ '--card-color': feature.color }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <div className={styles.iconGlow} style={{ background: `${feature.color}33` }}></div>
                  <div className={styles.icon} style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}cc)` }}>
                    {feature.icon}
                  </div>
                </div>
              </div>

              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>

              <div className={styles.featureDetails}>
                <div className={styles.detailsLabel}>Based on:</div>
                <ul className={styles.detailsList}>
                  {feature.details.map((detail, detailIdx) => (
                    <li key={detailIdx}>
                      <span className={styles.arrow}>→</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.featureNote}>
                {feature.note}
              </div>

              <div className={styles.cardGlow} style={{ background: `radial-gradient(ellipse at center, ${feature.color}15, transparent 70%)` }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
