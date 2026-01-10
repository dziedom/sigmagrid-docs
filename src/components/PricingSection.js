import React, { useState, useEffect } from 'react';
import styles from './PricingSection.module.css';

const pricingCards = [
  {
    id: 'signals',
    icon: '📊',
    tier: 'CORE',
    title: 'Signals',
    description: 'Master consolidated view',
    endpoints: ['/v1/signals/{ticker}'],
    price: '0.05',
    priceLabel: '~$',
    fields: ['fair_value', 'regime', 'drift_1h', 'vol_forecast', 'event_context'],
    color: '#3b82f6',
  },
  {
    id: 'specialized',
    icon: '⚡',
    tier: 'SPECIALIZED',
    title: 'Specialized Views',
    description: 'Focused data surfaces',
    endpoints: ['/v1/drift', '/v1/regime', '/v1/events', '/v1/premium', '/v1/arbitrage'],
    price: '0.02-0.05',
    priceLabel: '~$',
    fields: ['Directional bias', 'Risk sizing', 'Macro events', 'Arbitrage metrics'],
    popular: true,
    color: '#8b5cf6',
  },
  {
    id: 'bulk',
    icon: '🚀',
    tier: 'BULK',
    title: 'Bulk Access',
    description: 'Multi-ticker and historical',
    endpoints: ['/v1/snapshot', '/v1/historical'],
    price: 'Varies',
    priceLabel: '',
    fields: ['Multi-ticker snapshots', 'Historical time series', 'Volume-based pricing'],
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
            <span className={styles.codeComment}>// All prices in USDC via x402 protocol</span>
          </div>
        </div>
      </div>
    </section>
  );
}
