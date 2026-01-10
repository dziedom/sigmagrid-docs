import React, { useEffect, useRef, useState } from 'react';
import styles from './CredibilitySection.module.css';

export default function CredibilitySection() {
  const [isVisible, setIsVisible] = useState(true);
  const [naiveValue, setNaiveValue] = useState(0);
  const [sigmagridValue, setSigmagridValue] = useState(0);
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

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      const naiveTarget = 32.7;
      const sigmagridTarget = 67.3;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        setNaiveValue(Math.min(naiveTarget * progress, naiveTarget));
        setSigmagridValue(Math.min(sigmagridTarget * progress, sigmagridTarget));

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const edgeBreakdown = [
    { window: 'Off-hours', value: '8.1bp' },
    { window: 'Weekends', value: '9.3bp' },
    { window: 'Event windows', value: '12.7bp' },
  ];

  return (
    <section ref={sectionRef} className={styles.credibilitySection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionKicker}>Proof</div>
          <h2 className={styles.sectionTitle}>Built by Quants, For Quants</h2>
          <div className={styles.teamCallout}>
            <p>
              "Crypto perpetual markets needed what traditional equities have had for decades:
              institutional-grade fundamentals. We built it."
            </p>
          </div>
          <div className={styles.background}>
            <p>
              <strong>Team Backgrounds:</strong>
            </p>
            <ul>
              <li>→ Elite university</li>
              <li>→ 20+ years in equity derivatives at global investment banks</li>
              <li>→ Built systematic market-making infrastructure for institutional flow</li>
              <li>→ Expertise in volatility modeling, microstructure, and quantitative strategies</li>
              <li>→ Built and operated across Layer 1s and DeFi protocols</li>
              <li>→ Multiple shipped products across crypto infrastructure</li>
            </ul>
            <p className={styles.whyWeBuilt}>
              <strong>Why we built this:</strong>
              <br />
              Our team spans institutional TradFi and crypto-native DeFi.
              Crypto perps had no fundamental anchor. Bots were trading blind.
              So we bridged the gap with institutional-grade fair value models.
            </p>
          </div>
        </div>

        <div className={styles.trackRecord}>
          <div className={styles.trackRecordHeader}>
            <h3>Live Performance Metrics</h3>
            <div className={styles.updatedBadge}>
              <span className={styles.liveDot}></span>
              Updated Hourly
            </div>
          </div>

          <div className={styles.chartContainer}>
            <h4 className={styles.chartTitle}>Fair Value Accuracy (6-Month Rolling)</h4>
            <div className={styles.barChart}>
              <div className={styles.barRow}>
                <div className={styles.barLabel}>Naive Baseline</div>
                <div className={styles.barWrapper}>
                  <div
                    className={`${styles.bar} ${styles.barNaive}`}
                    style={{ width: `${naiveValue}%` }}
                  >
                    <span className={styles.barValue}>{naiveValue.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              <div className={styles.barRow}>
                <div className={styles.barLabel}>SigmaGrid FV</div>
                <div className={styles.barWrapper}>
                  <div
                    className={`${styles.bar} ${styles.barSigmagrid}`}
                    style={{ width: `${sigmagridValue}%` }}
                  >
                    <span className={styles.barValue}>{sigmagridValue.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.metrics}>
              <div className={styles.metric}>
                <span className={styles.metricLabel}>✓ Win rate vs naive baseline:</span>
                <span className={styles.metricValue}>67.3%</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricLabel}>✓ Average edge:</span>
                <span className={styles.metricValue}>5.2 basis points</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricLabel}>✓ Sample size:</span>
                <span className={styles.metricValue}>14,847 predictions</span>
              </div>
            </div>

            <div className={styles.edgeBreakdown}>
              <h4>Largest edge during:</h4>
              <div className={styles.edgeTable}>
                {edgeBreakdown.map((item, idx) => (
                  <div key={idx} className={styles.edgeRow}>
                    <span className={styles.edgeWindow}>→ {item.window}:</span>
                    <span className={styles.edgeValue}>{item.value} average</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.methodology}>
              <p>
                <strong>Methodology:</strong>
                <br />
                We compare our fair value vs simple cross-venue mid-price averaging.
                For each prediction, we measure which estimate was closer to the actual
                price 1-hour and 4-hours later.
              </p>
              <p className={styles.auditable}>
                All metrics are publicly auditable.
              </p>
            </div>

            <div className={styles.dashboardLink}>
              <a href="/dashboard">View Demo Dashboard →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
