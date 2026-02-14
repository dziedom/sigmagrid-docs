import React, { useEffect, useRef, useState } from 'react';
import styles from './ProblemSection.module.css';

export default function ProblemSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const tradfiSources = [
    { name: 'NYSE', status: 'CLOSED' },
    { name: 'NASDAQ', status: 'CLOSED' },
    { name: 'Bloomberg', status: 'OFFLINE' },
    { name: 'Analyst Desks', status: 'DARK' },
  ];

  const perps = [
    { name: 'SPY-PERP', price: '$585.80' },
    { name: 'QQQ-PERP', price: '$432.15' },
    { name: 'TSLA-PERP', price: '$248.30' },
  ];

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.kicker}>[ THE PROBLEM ]</div>
          <h2 className={styles.title}>The 24/7 Fair Value Gap</h2>
          <p className={styles.lead}>
            Crypto synthetic equity perpetuals trade around the clock across Hyperliquid, Avantis, and Ostium.
            But institutional fundamentals only exist during market hours.
          </p>
        </div>

        <div className={`${styles.timeline} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.timelineMarker}>
            <span className={styles.timeLabel}>2:00 AM Sunday</span>
            <span className={styles.timeSub}>Your bot is trading</span>
          </div>

          <div className={styles.columns}>
            <div className={styles.column}>
              <div className={styles.columnLabel}>Traditional Markets</div>
              <div className={styles.itemList}>
                {tradfiSources.map((item, idx) => (
                  <div key={idx} className={styles.item}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.statusOff}>{item.status}</span>
                  </div>
                ))}
              </div>
              <div className={styles.verdict}>Your trading bot: flying blind</div>
            </div>

            <div className={styles.dividerVert} />

            <div className={styles.column}>
              <div className={styles.columnLabel}>Crypto Perpetuals</div>
              <div className={styles.itemList}>
                {perps.map((item, idx) => (
                  <div key={idx} className={styles.item}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.priceGroup}>
                      <span className={styles.price}>{item.price}</span>
                      <span className={styles.statusOn}>LIVE</span>
                    </span>
                  </div>
                ))}
              </div>
              <div className={styles.consequences}>
                Without a fundamental anchor, you overpay during thin liquidity,
                miss mean-reversion, and can't distinguish rich from cheap.
              </div>
            </div>
          </div>
        </div>

        <div className={styles.closing}>
          <p>Traditional markets have institutional infrastructure.</p>
          <p>Crypto perps have been guessing. <strong>Until now.</strong></p>
        </div>
      </div>
    </section>
  );
}
