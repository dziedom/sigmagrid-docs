import React from 'react';
import styles from './PricingSection.module.css';

const pricingCards = [
  {
    tier: 'SINGLE SIGNAL',
    title: 'Single Signal',
    description: '9 focused endpoints',
    endpoints: ['/v1/fair-value', '/v1/premium', '/v1/spread', '/v1/funding', '/v1/regime', '/v1/event-risk', '/v1/events', '/v1/arbitrage', '/v1/regime-basic'],
    price: '0.02',
    fields: ['Fair value + confidence', 'Per-venue premiums', 'Spread & arbitrage flags', 'Funding z-scores', 'Regime classification', 'Event risk'],
  },
  {
    tier: 'RICH DATA',
    title: 'Rich Data',
    description: 'Full signal snapshots + history',
    endpoints: ['/v1/alpha-snapshot/{ticker}', '/v1/historical/{ticker}'],
    price: '0.03',
    fields: ['All signal columns (one ticker)', 'Historical time series', 'Macro betas included'],
    popular: true,
  },
  {
    tier: 'BULK / BATCH',
    title: 'Bulk Access',
    description: 'Multi-ticker snapshots',
    endpoints: ['/v1/snapshot', '/v1/alpha-snapshot/batch'],
    price: '0.05',
    fields: ['Multi-ticker dashboard snapshot', 'Batch alpha snapshots', 'Portfolio-level analysis'],
  },
];

export default function PricingSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.kicker}>[ TRANSPARENT PRICING ]</div>
          <h2 className={styles.title}>Pay Per Query</h2>
          <p className={styles.lead}>
            x402 micropayments. No subscriptions. No minimums. You only pay for what you use.
          </p>
        </div>

        <div className={styles.grid}>
          {pricingCards.map((card) => (
            <div key={card.tier} className={`${styles.card} ${card.popular ? styles.popular : ''}`}>
              {card.popular && <div className={styles.popularTag}>Most Flexible</div>}
              <div className={styles.cardTier}>{card.tier}</div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.description}</p>

              <div className={styles.priceBlock}>
                <span className={styles.priceValue}>{card.price}</span>
                <span className={styles.priceUnit}>USDC /req</span>
              </div>

              <div className={styles.endpointList}>
                {card.endpoints.map((ep, idx) => (
                  <div key={idx} className={styles.endpoint}>
                    <span className={styles.endpointArrow}>&rarr;</span>
                    <code>{ep}</code>
                  </div>
                ))}
              </div>

              <div className={styles.fieldList}>
                {card.fields.map((field, idx) => (
                  <div key={idx} className={styles.field}>
                    <span className={styles.fieldDot} />
                    {field}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.note}>
          All prices in USDC via x402 protocol. /v1/signals is free (teaser).
        </div>
      </div>
    </section>
  );
}
