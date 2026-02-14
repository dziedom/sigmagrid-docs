import React, { useEffect, useRef, useState } from 'react';
import styles from './CredibilitySection.module.css';

export default function CredibilitySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [naiveValue, setNaiveValue] = useState(0);
  const [sigmagridValue, setSigmagridValue] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        setNaiveValue(Math.min(32.7 * progress, 32.7));
        setSigmagridValue(Math.min(67.3 * progress, 67.3));
        if (currentStep >= steps) clearInterval(interval);
      }, stepDuration);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.kicker}>[ PROOF ]</div>
          <h2 className={styles.title}>Built by Quants, For Quants</h2>
          <p className={styles.lead}>
            Our team spans institutional TradFi and crypto-native DeFi. 20+ years in equity derivatives,
            systematic market-making, volatility modeling, and DeFi protocol engineering.
          </p>
        </div>

        <div className={styles.metricsCard}>
          <div className={styles.metricsHeader}>
            <h3>Live Performance</h3>
            <div className={styles.badge}>
              <span className={styles.liveDot} />
              Updated Hourly
            </div>
          </div>

          <div className={styles.barChart}>
            <div className={styles.barRow}>
              <span className={styles.barLabel}>Naive Baseline</span>
              <div className={styles.barTrack}>
                <div className={styles.barNaive} style={{ width: `${naiveValue}%` }}>
                  <span className={styles.barValue}>{naiveValue.toFixed(1)}%</span>
                </div>
              </div>
            </div>
            <div className={styles.barRow}>
              <span className={styles.barLabel}>SigmaGrid FV</span>
              <div className={styles.barTrack}>
                <div className={styles.barSg} style={{ width: `${sigmagridValue}%` }}>
                  <span className={styles.barValue}>{sigmagridValue.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Win rate vs naive</span>
              <span className={styles.statValue}>67.3%</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Average edge</span>
              <span className={styles.statValue}>5.2bp</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Sample size</span>
              <span className={styles.statValue}>14,847</span>
            </div>
          </div>

          <div className={styles.edgeRow}>
            <span>Largest edge: off-hours 8.1bp, weekends 9.3bp, events 12.7bp</span>
          </div>

          <div className={styles.footer}>
            <a href="/dashboard">View Demo Dashboard &rarr;</a>
          </div>
        </div>
      </div>
    </section>
  );
}
