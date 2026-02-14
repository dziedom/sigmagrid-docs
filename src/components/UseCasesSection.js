import React from 'react';
import styles from './UseCasesSection.module.css';

export default function UseCasesSection() {
  const useCases = [
    {
      label: 'BOTS',
      title: 'AI Trading Bots',
      desc: "Is $585.80 a good entry at 2am Sunday? Query fair value, discover you're 60bp rich, wait for mean-reversion.",
      metric: '5-10bp per trade improvement',
    },
    {
      label: 'LIQUIDITY',
      title: 'Market Makers',
      desc: 'Quote bid/ask around institutional fair value. Detect stale venues. Adjust spreads during high-vol regimes.',
      metric: 'Tighter spreads, lower inventory risk',
    },
    {
      label: 'SYSTEMATIC',
      title: 'Crypto Hedge Funds',
      desc: 'Fair value time series, regime classifications, divergence events, and event impact analysis for strategy development.',
      metric: 'Proprietary strategy development',
    },
    {
      label: 'RISK',
      title: 'Portfolio Managers',
      desc: 'Real-time fair value vs positions. Event countdown timers. Regime transition alerts. Cross-venue divergence warnings.',
      metric: 'Better risk management',
    },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.kicker}>[ USE CASES ]</div>
          <h2 className={styles.title}>Who Uses SigmaGrid</h2>
        </div>

        <div className={styles.grid}>
          {useCases.map((uc, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardLabel}>{uc.label}</div>
              <h3 className={styles.cardTitle}>{uc.title}</h3>
              <p className={styles.cardDesc}>{uc.desc}</p>
              <div className={styles.cardMetric}>
                <span className={styles.metricArrow}>&rarr;</span>
                {uc.metric}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
