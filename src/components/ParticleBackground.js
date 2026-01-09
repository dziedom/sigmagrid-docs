import React, { useEffect, useRef } from 'react';
import styles from './ParticleBackground.module.css';

export default function ParticleBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const particles = [];
    // Reduce particle count on mobile for performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 50;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = styles.particle;
      particle.setAttribute('aria-hidden', 'true');
      
      // Random starting position
      const startX = Math.random() * 100;
      const duration = 15 + Math.random() * 10; // 15-25 seconds
      const delay = Math.random() * 5;
      
      particle.style.left = `${startX}%`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      container.appendChild(particle);
      particles.push(particle);
    }

    // Cleanup
    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return <div ref={containerRef} className={styles.heroBg} aria-hidden="true" />;
}
