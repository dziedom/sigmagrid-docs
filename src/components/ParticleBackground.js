import React, { useEffect, useRef } from 'react';
import styles from './ParticleBackground.module.css';

export default function ParticleBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const particles = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 15 : 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = styles.particle;
      particle.setAttribute('aria-hidden', 'true');

      const startX = Math.random() * 100;
      const duration = 20 + Math.random() * 15;
      const delay = Math.random() * 8;

      particle.style.left = `${startX}%`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;

      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
      });
    };
  }, []);

  return <div ref={containerRef} className={styles.heroBg} aria-hidden="true" />;
}
