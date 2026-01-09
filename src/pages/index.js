import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import ParticleBackground from '../components/ParticleBackground';
import SignalFlow from '../components/SignalFlow';
import QueryFeed from '../components/QueryFeed';
import PricingSection from '../components/PricingSection';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title="SigmaGrid — Institutional Fundamentals for Synthetic-Equity Perpetuals"
      description="SigmaGrid is the institutional fundamentals API for synthetic-equity perpetuals (SPY-PERP, QQQ-PERP, TSLA-PERP and more). Public docs live now — Paid API launching Q1 2026."
    >
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <ParticleBackground />
          <div className="container">
            <div className={styles.heroBanner}>
              <span>API coming Q1 2026</span>
              <span>•</span>
              <span>Public docs live now — Paid API launching Q1 2026</span>
            </div>
            <h1 className={styles.heroTitle}>
              Reference Signals for<br />Bot Decision-Making
            </h1>
            <p className={styles.heroSubtitle}>Your bot decides. We provide context.</p>
            <p className={styles.heroTagline}>Not a strategy. A complement.</p>

            <div className={styles.buttonGroup}>
              <Link className={`${styles.btn} ${styles.btnPrimary}`} to="/docs/intro">
                View Live Signals
              </Link>
              <Link className={`${styles.btn} ${styles.btnSecondary}`} to="/docs/intro">
                Integration Docs
              </Link>
            </div>

            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <div className={styles.featureIconGlow}></div>
                  <div className={styles.featureIcon}>
                    <span className={styles.iconSymbol}>✓</span>
                  </div>
                </div>
                <div className={styles.featureLabel}>VALIDATION</div>
                <h3>Validate Your Thesis</h3>
                <p>
                  Get another data point when your bot needs it most. Query selectively for marginal decisions.
                </p>
                <div className={styles.featureCode}>
                  <span className={styles.codeSnippet}>if (confidence &lt; 0.7) query()</span>
                </div>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <div className={styles.featureIconGlow} style={{ background: 'rgba(245, 158, 11, 0.2)' }}></div>
                  <div className={styles.featureIcon} style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                    <span className={styles.iconSymbol}>$</span>
                  </div>
                </div>
                <div className={styles.featureLabel}>PRICING</div>
                <h3>Dynamic Pricing</h3>
                <p>Pay 0.02-0.15 USDC per signal based on value. No subscriptions. No waste.</p>
                <div className={styles.featureCode}>
                  <span className={styles.codeSnippet}>cost: <span className={styles.priceValue}>0.05</span> USDC/req</span>
                </div>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <div className={styles.featureIconGlow} style={{ background: 'rgba(139, 92, 246, 0.2)' }}></div>
                  <div className={styles.featureIcon} style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
                    <span className={styles.iconSymbol}>⚡</span>
                  </div>
                </div>
                <div className={styles.featureLabel}>SELECTIVE</div>
                <h3>Query Selectively</h3>
                <p>Use what helps. Skip what doesn't. Your bot sets the rules.</p>
                <div className={styles.featureCode}>
                  <span className={styles.codeSnippet}>bot.rules = <span className={styles.codeTrue}>true</span></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Signal Flow Visualization */}
        <SignalFlow />

        {/* Live Query Feed */}
        <QueryFeed />

        {/* Pricing Section */}
        <PricingSection />

        {/* Purpose Section */}
        <section className={styles.section}>
          <div className={styles.sectionKicker}>Purpose</div>
          <h2 className={styles.sectionTitle}>
            Institutional fundamentals for agent-driven markets
          </h2>
          <p className={styles.sectionLead}>
            Traditional equity markets run on robust anchors: fair value, volatility forecasts, drift,
            regime classification, and event sensitivity. Crypto synthetic-equity perpetuals trade 24/7
            without those anchors.
          </p>
          <p className={styles.sectionLead} style={{ marginTop: '1rem', opacity: 0.9 }}>
            SigmaGrid supplies those institutional fundamentals as composable JSON feeds, so execution
            engines, quant desks, and AI agents can trust the context they are trading on.
          </p>
        </section>
      </main>
    </Layout>
  );
}
