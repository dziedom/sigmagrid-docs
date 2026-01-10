import React from 'react';
import styles from './UseCasesSection.module.css';

export default function UseCasesSection() {
  const useCases = [
    {
      icon: '🤖',
      title: 'AI Trading Bots',
      challenge: "Your bot trades SPY-PERP at 2am on Sunday. Is $585.80 a good entry, or are you buying into noise?",
      solution: "Query SigmaGrid fair value: $585.20 → You're 60bp rich → Wait for mean-reversion → Save 60bp on entry",
      usage: '100-1,000 queries/day',
      cost: '$10-100/month',
      roi: '5-10bp per trade improvement',
      link: 'See Bot Integration Example →',
      color: '#3b82f6',
    },
    {
      icon: '📊',
      title: 'Market Makers',
      challenge: 'Provide liquidity across multiple venues. Need accurate pricing to avoid adverse selection.',
      solution: 'Use SigmaGrid fair value as pricing anchor: → Quote bid/ask around institutional FV → Detect when one venue is stale → Adjust spreads during high-vol regimes',
      usage: '10,000+ queries/day',
      cost: '$100-1,000/month',
      roi: 'Tighter spreads, lower inventory risk',
      link: 'View Market Maker Docs →',
      color: '#8b5cf6',
    },
    {
      icon: '🏦',
      title: 'Crypto Hedge Funds',
      challenge: 'Build systematic strategies on synthetic equity perps. Need high-quality data for backtesting.',
      solution: 'Access full historical data: → Fair value time series (12+ months) → Regime classifications → Divergence events → Event impact analysis',
      usage: 'Research + live trading',
      cost: 'Enterprise tier ($1K-10K/month)',
      roi: 'Proprietary strategy development',
      link: 'Contact for Enterprise Access →',
      color: '#f59e0b',
    },
    {
      icon: '💼',
      title: 'Portfolio Managers',
      challenge: 'Monitor multi-venue perp exposure 24/7. Need alerts for risk events.',
      solution: 'Set up monitoring dashboards: → Real-time fair value vs positions → Event countdown timers → Regime transition alerts → Cross-venue divergence warnings',
      usage: 'Dashboards + API integration',
      cost: 'Custom pricing',
      roi: 'Better risk management, fewer surprises',
      link: 'Schedule Demo →',
      color: '#22c55e',
    },
  ];

  return (
    <section className={styles.useCasesSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionKicker}>Use Cases</div>
          <h2 className={styles.sectionTitle}>Who Uses SigmaGrid</h2>
        </div>

        <div className={styles.useCasesGrid}>
          {useCases.map((useCase, idx) => (
            <div
              key={idx}
              className={styles.useCaseCard}
              style={{ '--card-color': useCase.color }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <div className={styles.iconGlow} style={{ background: `${useCase.color}33` }}></div>
                  <div className={styles.icon} style={{ background: `linear-gradient(135deg, ${useCase.color}, ${useCase.color}cc)` }}>
                    {useCase.icon}
                  </div>
                </div>
                <h3 className={styles.cardTitle}>{useCase.title}</h3>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.challenge}>
                  <div className={styles.label}>Challenge:</div>
                  <p>{useCase.challenge}</p>
                </div>

                <div className={styles.solution}>
                  <div className={styles.label}>Solution:</div>
                  <p>{useCase.solution}</p>
                </div>

                <div className={styles.metrics}>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>Typical usage:</span>
                    <span className={styles.metricValue}>{useCase.usage}</span>
                  </div>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>Cost:</span>
                    <span className={styles.metricValue}>{useCase.cost}</span>
                  </div>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>ROI:</span>
                    <span className={styles.metricValue}>{useCase.roi}</span>
                  </div>
                </div>

                <div className={styles.cardLink}>
                  <a href="/docs/api-reference">{useCase.link}</a>
                </div>
              </div>

              <div className={styles.cardGlow} style={{ background: `radial-gradient(ellipse at center, ${useCase.color}15, transparent 70%)` }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
