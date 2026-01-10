import React from 'react';
import Link from '@docusaurus/Link';
import styles from './CTASection.module.css';

export default function CTASection() {
  const ctas = [
    {
      icon: '📊',
      title: 'See It Live',
      description: 'View our public monitoring dashboard: → Real-time accuracy metrics → Fair value predictions vs outcomes → Cross-venue divergence heatmap',
      note: 'Sample data • No signup required.',
      link: '/dashboard',
      linkText: 'View Dashboard →',
      color: '#3b82f6',
    },
    {
      icon: '📖',
      title: 'Read the Docs',
      description: 'Complete API documentation: → Endpoint reference → Code examples (Python, Node, Rust) → Integration guides → Best practices',
      note: '5-minute integration.',
      link: '/docs/api-reference',
      linkText: 'API Documentation →',
      color: '#8b5cf6',
    },
  ];

  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Start Trading with Institutional Signals</h2>
        </div>

        <div className={styles.ctaGrid}>
          {ctas.map((cta, idx) => (
            <div
              key={idx}
              className={styles.ctaCard}
              style={{ '--card-color': cta.color }}
            >
              <div className={styles.cardIcon} style={{ background: `linear-gradient(135deg, ${cta.color}, ${cta.color}cc)` }}>
                {cta.icon}
              </div>
              <h3 className={styles.cardTitle}>{cta.title}</h3>
              <div className={styles.cardDescription}>
                {cta.description.split('→').map((line, lineIdx) => {
                  if (lineIdx === 0) {
                    return <p key={lineIdx}>{line.trim()}</p>;
                  }
                  return (
                    <div key={lineIdx} className={styles.bulletPoint}>
                      → {line.trim()}
                    </div>
                  );
                })}
              </div>
              <div className={styles.cardNote}>{cta.note}</div>
              <Link className={styles.ctaButton} to={cta.link} style={{ '--button-color': cta.color }}>
                {cta.linkText}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
