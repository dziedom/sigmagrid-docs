import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import ParticleBackground from '../components/ParticleBackground';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TryItNow from '../components/TryItNow';
import SocialProof from '../components/SocialProof';
import UseCasesSection from '../components/UseCasesSection';
import CredibilitySection from '../components/CredibilitySection';
import PricingSection from '../components/PricingSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title="SigmaGrid — Institutional Fair Value for Crypto Perpetual Markets"
      description="Traditional equity markets close at 4pm. Crypto synthetic equity perps trade 24/7. Get institutional-grade fair value when Bloomberg terminals go dark. Trusted by AI trading bots, market makers, and crypto hedge funds."
    >
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <ParticleBackground />
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className="container">
            <div className={styles.heroContent}>
              <div className={styles.kicker}>[ INTRODUCING ]</div>
              <h1 className={styles.heroTitle}>
                Institutional Fair Value<br />for Crypto Perpetual Markets
              </h1>
              <p className={styles.heroSubtitle}>
                Traditional equity markets close at 4pm. Crypto synthetic equity perps trade 24/7.
                Get institutional-grade fair value when Bloomberg terminals go dark.
              </p>

              <div className={styles.buttonGroup}>
                <Link className={styles.btnPrimary} to="/docs/intro">
                  Go to Console
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link className={styles.btnSecondary} to="/docs/api-reference">
                  Learn More
                </Link>
              </div>

              <div className={styles.heroMeta}>
                <span className={styles.metaItem}>
                  <span className={styles.liveDot} />
                  API Live
                </span>
                <span className={styles.metaDivider} />
                <span className={styles.metaItem}>19 Endpoints</span>
                <span className={styles.metaDivider} />
                <span className={styles.metaItem}>x402 Micropayments</span>
                <span className={styles.metaDivider} />
                <span className={styles.metaItem}>Hyperliquid, Avantis, Ostium</span>
              </div>
            </div>
          </div>
        </section>

        <ProblemSection />
        <TryItNow />
        <SolutionSection />
        <HowItWorksSection />
        <SocialProof />
        <UseCasesSection />
        <CredibilitySection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
    </Layout>
  );
}
