import React from 'react';
import Link from '@docusaurus/Link';
import styles from './CTASection.module.css';

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.kicker}>[ GET STARTED ]</div>
          <h2 className={styles.title}>Start Trading with Institutional Signals</h2>

          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardLabel}>QUICKSTART</div>
              <h3 className={styles.cardTitle}>From zero to signals in 60 seconds</h3>
              <p className={styles.cardDesc}>
                Free curl one-liner. Decision loop examples. Python & Node snippets. x402 payment walkthrough. No signup required.
              </p>
              <Link className={styles.btn} to="/docs/quickstart">
                Start in 60 Seconds
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            <div className={styles.card}>
              <div className={styles.cardLabel}>DOCUMENTATION</div>
              <h3 className={styles.cardTitle}>Complete API reference</h3>
              <p className={styles.cardDesc}>
                19 endpoints across 5 tiers. Code examples in Python, Node, and Rust. Field reference. Agent integration guides.
              </p>
              <Link className={styles.btnOutline} to="/docs/api-reference">
                API Documentation
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
