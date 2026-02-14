import React from 'react';
import Link from '@docusaurus/Link';
import styles from './CTASection.module.css';

export default function CTASection() {
  const ctas = [
    {
      icon: '&#9889;',
      title: 'Quickstart',
      description: 'From zero to signals in 60 seconds: → Free curl one-liner → Decision loop examples → Python & Node.js snippets → x402 payment walkthrough',
      note: 'No signup. No SDK. Just curl.',
      link: '/docs/quickstart',
      linkText: 'Start in 60 Seconds',
      color: '#22c55e',
    },
    {
      icon: '&#128218;',
      title: 'Full API Docs',
      description: 'Complete API documentation: → 19 endpoints across 5 tiers → Code examples (Python, Node, Rust) → Field reference → Agent integration guides',
      note: '5-minute integration.',
      link: '/docs/api-reference',
      linkText: 'API Documentation',
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
                <span dangerouslySetInnerHTML={{ __html: cta.icon }} />
              </div>
              <h3 className={styles.cardTitle}>{cta.title}</h3>
              <div className={styles.cardDescription}>
                {cta.description.split('\u2192').map((line, lineIdx) => {
                  if (lineIdx === 0) {
                    return <p key={lineIdx}>{line.trim()}</p>;
                  }
                  return (
                    <div key={lineIdx} className={styles.bulletPoint}>
                      &rarr; {line.trim()}
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
