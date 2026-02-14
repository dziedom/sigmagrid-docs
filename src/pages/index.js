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
          <div className="container">
            <div className={styles.heroBanner}>
              <span>API live</span>
              <span>&bull;</span>
              <span>19 endpoints &bull; x402 micropayments &bull; Hyperliquid, Avantis, Ostium</span>
            </div>
            <h1 className={styles.heroTitle}>
              Institutional Fair Value for<br />Crypto Perpetual Markets
            </h1>
            <p className={styles.heroSubtitle}>
              Traditional equity markets close at 4pm.
              <br />
              Crypto synthetic equity perps trade 24/7.
            </p>
            <p className={styles.heroTagline}>
              Get institutional-grade fair value when Bloomberg terminals go dark.
            </p>

            <div className={styles.buttonGroup}>
              <Link className={`${styles.btn} ${styles.btnPrimary}`} to="/docs/intro">
                View Live Signals
              </Link>
              <Link className={`${styles.btn} ${styles.btnSecondary}`} to="/dashboard">
                View Dashboard
              </Link>
              <Link className={`${styles.btn} ${styles.btnSecondary}`} to="/docs/api-reference">
                Integration Docs
              </Link>
            </div>

            <div className={styles.heroSupporting}>
              <p>
                Trusted by AI trading bots, market makers, and crypto hedge funds
                trading SPY-PERP, QQQ-PERP, TSLA-PERP, and other synthetic equity perpetuals.
              </p>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <ProblemSection />

        {/* Try It Now — live endpoint demo */}
        <TryItNow />

        {/* Solution Section */}
        <SolutionSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Social Proof — live stats + query feed */}
        <SocialProof />

        {/* Use Cases Section */}
        <UseCasesSection />

        {/* Credibility Section */}
        <CredibilitySection />

        {/* Pricing Section */}
        <PricingSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <CTASection />
      </main>
    </Layout>
  );
}
