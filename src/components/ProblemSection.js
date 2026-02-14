import React, { useEffect, useRef, useState } from 'react';
import styles from './ProblemSection.module.css';

export default function ProblemSection() {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const markets = [
    { name: 'NYSE', status: 'CLOSED', delay: 0 },
    { name: 'NASDAQ', status: 'CLOSED', delay: 0.3 },
    { name: 'Bloomberg Terminal', status: 'OFFLINE', delay: 0.6 },
    { name: 'Institutional Desks', status: 'CLOSED', delay: 0.9 },
    { name: 'Analyst Coverage', status: 'DARK', delay: 1.2 },
  ];

  const cryptoPerps = [
    { name: 'SPY-PERP', price: '585.80', status: 'LIVE', delay: 0 },
    { name: 'QQQ-PERP', price: '432.15', status: 'LIVE', delay: 0.2 },
    { name: 'TSLA-PERP', price: '248.30', status: 'LIVE', delay: 0.4 },
  ];

  return (
    <section ref={sectionRef} className={styles.problemSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionKicker}>The Problem</div>
          <h2 className={styles.sectionTitle}>The 24/7 Fair Value Problem</h2>
          <p className={styles.sectionDescription}>
            Crypto synthetic equity perpetuals (SPY-PERP, QQQ-PERP, TSLA-PERP) trade around the clock across Hyperliquid, Avantis, and Ostium.
          </p>
          <p className={styles.sectionDescription}>
            But institutional fundamentals only exist during market hours (9:30am-4pm ET, Mon-Fri).
          </p>
        </div>

        <div className={styles.splitScreen}>
          {/* Left Side - Traditional Markets */}
          <div className={`${styles.marketColumn} ${styles.traditionalMarkets} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.columnHeader}>
              <h3>Traditional Markets</h3>
              <div className={styles.timeDisplay}>2:00 AM Sunday</div>
            </div>
            <div className={styles.marketList}>
              {markets.map((market, idx) => (
                <div
                  key={idx}
                  className={styles.marketItem}
                  style={{ animationDelay: `${market.delay}s` }}
                >
                  <div className={styles.marketName}>{market.name}</div>
                  <div className={`${styles.statusBadge} ${styles.offline}`}>
                    {market.status}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.botStatus}>
              <span className={styles.botIcon}>🤖</span>
              <span className={styles.botText}>Your trading bot: Flying blind</span>
            </div>
          </div>

          {/* Center Divider */}
          <div className={styles.divider}>
            <div className={styles.dividerLine}></div>
            <div className={styles.dividerText}>
              <div className={styles.clockIcon}>🕐</div>
              <div>2:00 AM Sunday</div>
              <div className={styles.dividerSubtext}>Your bot is trading</div>
            </div>
            <div className={styles.dividerLine}></div>
          </div>

          {/* Right Side - Crypto Perps */}
          <div className={`${styles.marketColumn} ${styles.cryptoPerps} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.columnHeader}>
              <h3>Crypto Perpetuals</h3>
              <div className={styles.timeDisplay}>24/7 Trading</div>
            </div>
            <div className={styles.marketList}>
              {cryptoPerps.map((perp, idx) => (
                <div
                  key={idx}
                  className={styles.marketItem}
                  style={{ animationDelay: `${perp.delay}s` }}
                >
                  <div className={styles.marketName}>{perp.name}</div>
                  <div className={styles.priceDisplay}>
                    <span className={styles.priceValue}>${perp.price}</span>
                    <span className={`${styles.statusBadge} ${styles.live}`}>
                      {perp.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.problemText}>
              <p>Without a fundamental anchor, you're trading against orderbook noise:</p>
              <ul className={styles.problemList}>
                <li>→ Overpay during thin liquidity</li>
                <li>→ Miss mean-reversion opportunities</li>
                <li>→ Get liquidated on event-driven moves</li>
                <li>→ Can't distinguish rich vs cheap</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.closingStatement}>
          <p className={styles.closingText}>
            Traditional markets have institutional infrastructure.
            <br />
            Crypto perps have been guessing.
            <br />
            <strong>Until now.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
