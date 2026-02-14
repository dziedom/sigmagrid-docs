import React from 'react';
import styles from './SolutionSection.module.css';

export default function SolutionSection() {
  const features = [
    {
      label: 'FAIR VALUE',
      title: 'Fair Value Anchors',
      description: 'Real-time institutional fair value for SPY, QQQ, IWM and MAG7 stocks. Based on equity fundamentals, volatility surface modeling, and macro sensitivity.',
      note: 'Updated every second, even when traditional markets are closed.',
    },
    {
      label: 'DIVERGENCE',
      title: 'Cross-Venue Intelligence',
      description: 'Track pricing across Hyperliquid, Avantis, and Ostium. Detect which venue is mispricing, find premium compression opportunities, and spot arbitrage.',
      note: 'Spot inefficiencies before the market corrects.',
    },
    {
      label: 'EVENT RISK',
      title: 'Event Risk Protection',
      description: 'Event-risk detection for FOMC, CPI, earnings, and geopolitical shocks. Countdown timers, impact classification, directional bias, and volatility forecasts.',
      note: 'Trade smarter around macro catalysts.',
    },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.kicker}>[ THE SOLUTION ]</div>
          <h2 className={styles.title}>Institutional Fundamentals, 24/7</h2>
          <p className={styles.lead}>
            We apply traditional equity derivatives models to crypto perpetual markets.
            We don't show you orderbook prices. <strong>We tell you what the price should be.</strong>
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardLabel}>{feature.label}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
              <div className={styles.cardNote}>{feature.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
