import React, { useState, useEffect } from 'react';
import styles from './PricingSection.module.css';

const pricingCards = [
  {
    id: 'single',
    icon: '📊',
    tier: 'SINGLE SIGNAL',
    title: 'Single Signal',
    description: '9 focused endpoints',
    endpoints: ['/v1/fair-value', '/v1/premium', '/v1/spread', '/v1/funding', '/v1/regime', '/v1/event-risk', '/v1/events', '/v1/arbitrage', '/v1/regime-basic'],
    price: '0.02',
    priceLabel: '',
    fields: ['Fair value + confidence', 'Per-venue premiums', 'Spread & arbitrage flags', 'Funding z-scores', 'Regime classification', 'Event risk'],
    color: '#3b82f6',
  },
  {
    id: 'rich',
    icon: '⚡',
    tier: 'RICH DATA',
    title: 'Rich Data',
    description: 'Full signal snapshots + history',
    endpoints: ['/v1/alpha-snapshot/{ticker}', '/v1/historical/{ticker}'],
    price: '0.03',
    priceLabel: '',
    fields: ['All signal columns (one ticker)', 'Historical time series', 'Macro betas included'],
    popular: true,
    color: '#8b5cf6',
  },
  {
    id: 'bulk',
    icon: '🚀',
    tier: 'BULK / BATCH',
    title: 'Bulk Access',
    description: 'Multi-ticker snapshots',
    endpoints: ['/v1/snapshot', '/v1/alpha-snapshot/batch'],
    price: '0.05',
    priceLabel: '',
    fields: ['Multi-ticker dashboard snapshot', 'Batch alpha snapshots', 'Portfolio-level analysis'],
    color: '#22c55e',
  },
];

export default function PricingSection() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section className={styles.pricingSection}>
      {/* Background effects */}
      <div className={styles.bgGlow}></div>
      
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.terminalHeader}>
            <span className={styles.terminalDot} style={{ background: '#ff5f56' }}></span>
            <span className={styles.terminalDot} style={{ background: '#ffbd2e' }}></span>
            <span className={styles.terminalDot} style={{ background: '#27ca40' }}></span>
            <span className={styles.terminalTitle}>pricing.config</span>
          </div>
          <h2 className={styles.sectionTitle}>Pay Per Query (x402 Protocol)</h2>
          <p className={styles.sectionDescription}>
            <span className={styles.liveIndicator}>
              <span className={styles.liveDot}></span>
              Pay-per-use via x402 micropayments
            </span>
            <span className={styles.updateText}>No subscriptions. No minimums. No hidden fees.</span>
          </p>
          <p className={styles.x402Description}>
            You only pay for what you use. Stop anytime.
            <br />
            x402 micropayments mean you're charged per API call.
          </p>
        </div>

        <div className={styles.pricingGrid}>
          {pricingCards.map((card, index) => (
            <div 
              key={card.id} 
              className={`${styles.pricingCard} ${card.popular ? styles.popularCard : ''}`}
              style={{ '--card-color': card.color }}
              onMouseEnter={() => setActiveCard(card.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {card.popular && (
                <div className={styles.popularBadge}>
                  <span>MOST FLEXIBLE</span>
                </div>
              )}
              
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <div className={styles.iconGlow} style={{ background: `${card.color}33` }}></div>
                  <div className={styles.icon} style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}cc)` }}>
                    {card.icon}
                  </div>
                </div>
                <div className={styles.tierBadge} style={{ borderColor: `${card.color}66`, color: card.color }}>
                  {card.tier}
                </div>
              </div>

              <h3 className={styles.pricingTitle}>{card.title}</h3>
              <p className={styles.pricingDescription}>{card.description}</p>
              
              <div className={styles.endpointList}>
                {card.endpoints.map((endpoint, idx) => (
                  <div key={idx} className={styles.endpointItem}>
                    <span className={styles.endpointArrow}>→</span>
                    <code className={styles.endpointCode}>{endpoint}</code>
                  </div>
                ))}
              </div>

              <div className={styles.priceDisplay}>
                <div className={styles.priceWrapper}>
                  <span className={styles.priceFull} style={{ '--price-color': card.color }}>
                    {card.priceLabel && <span className={styles.pricePrefix}>{card.priceLabel}</span>}
                    <span className={styles.priceValue}>{card.price}</span>
                    <span className={styles.priceUnit}>/req</span>
                  </span>
                </div>
                <div className={styles.priceLine} style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }}></div>
              </div>

              <ul className={styles.signalList}>
                {card.fields.map((field, idx) => (
                  <li key={idx} className={styles.signalItem}>
                    <span className={styles.fieldDot} style={{ background: card.color }}></span>
                    <span className={styles.fieldName}>{field}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.cardGlow} style={{ background: `radial-gradient(ellipse at center, ${card.color}15, transparent 70%)` }}></div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.footerCode}>
            <span className={styles.codeComment}>// All prices in USDC via x402 protocol • /v1/signals is free (teaser)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
