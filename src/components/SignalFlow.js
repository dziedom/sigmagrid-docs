import React, { useEffect, useRef } from 'react';
import styles from './SignalFlow.module.css';

// Sample data packets that flow through the pipeline
const dataPackets = [
  { regime: 'trend', drift_1h: '+0.12' },
  { fair_value: '598.42', z_score: '0.8' },
  { event_next: 'FOMC', impact: 'high' },
  { vol_1h: '0.023', regime: 'LVOL' },
];

export default function SignalFlow() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const pathLeft = container.querySelector(`.${styles.connectionPathLeft}`);
    const pathRight = container.querySelector(`.${styles.connectionPathRight}`);

    if (!pathLeft || !pathRight) return;

    // Create flowing data packets
    const createPacket = (path, delay) => {
      const packet = document.createElement('div');
      packet.className = styles.dataPacket;
      packet.setAttribute('aria-hidden', 'true');
      
      // Random data snippet
      const data = dataPackets[Math.floor(Math.random() * dataPackets.length)];
      const key = Object.keys(data)[0];
      packet.textContent = `${key}: ${data[key]}`;
      
      packet.style.animationDelay = `${delay}s`;
      path.appendChild(packet);

      // Remove after animation completes
      setTimeout(() => {
        if (packet.parentNode) {
          packet.parentNode.removeChild(packet);
        }
      }, 4000 + delay * 1000);
    };

    // Spawn packets periodically
    const spawnPackets = () => {
      createPacket(pathLeft, 0);
      createPacket(pathRight, 0.5);
    };

    spawnPackets();
    const interval = setInterval(spawnPackets, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.signalFlowSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.terminalHeader}>
            <span className={styles.terminalDot} style={{ background: '#ff5f56' }}></span>
            <span className={styles.terminalDot} style={{ background: '#ffbd2e' }}></span>
            <span className={styles.terminalDot} style={{ background: '#27ca40' }}></span>
            <span className={styles.terminalTitle}>pipeline.sigmagrid</span>
          </div>
          <h2 className={styles.sectionTitle}>How SigmaGrid Works</h2>
          <p className={styles.sectionDescription}>
            <span className={styles.codeComment}>// Institutional-grade data → Proprietary processing → Your bot</span>
          </p>
        </div>

        <div className={styles.flowDiagram} ref={containerRef}>
          {/* Data Sources Node */}
          <div className={styles.flowNode}>
            <div className={styles.flowBox}>
              <div className={styles.nodeHeader}>
                <span className={styles.nodeIcon}>📡</span>
                <span className={styles.nodeLabel}>INPUT</span>
              </div>
              <h3>Data Sources</h3>
              <div className={styles.codeBlock}>
                <div className={styles.codeLine}>
                  <span className={styles.codeKey}>sources</span>: [
                </div>
                <div className={styles.codeLine + ' ' + styles.indent}>
                  <span className={styles.codeString}>"orderflow"</span>,
                </div>
                <div className={styles.codeLine + ' ' + styles.indent}>
                  <span className={styles.codeString}>"options_flow"</span>,
                </div>
                <div className={styles.codeLine + ' ' + styles.indent}>
                  <span className={styles.codeString}>"on_chain"</span>,
                </div>
                <div className={styles.codeLine + ' ' + styles.indent}>
                  <span className={styles.codeString}>"microstructure"</span>
                </div>
                <div className={styles.codeLine}>]</div>
              </div>
            </div>
          </div>

          {/* Connection Path Left */}
          <div className={styles.connectionWrapper}>
            <div className={styles.connectionPathLeft}>
              <div className={styles.connectionLine}></div>
              <div className={styles.connectionGlow}></div>
              <div className={styles.pulseOrb}></div>
            </div>
          </div>

          {/* Engine Node */}
          <div className={styles.flowNode}>
            <div className={`${styles.flowBox} ${styles.engineBox}`}>
              <div className={styles.nodeHeader}>
                <span className={styles.nodeIcon}>⚡</span>
                <span className={styles.nodeLabel}>PROCESS</span>
              </div>
              <h3>
                <span className={styles.lockIcon}>🔒</span>
                SigmaGrid Engine
              </h3>
              <div className={styles.engineStatus}>
                <div className={styles.statusRow}>
                  <span className={styles.statusDot}></span>
                  <span>Processing live feeds</span>
                </div>
                <div className={styles.statusRow}>
                  <span className={styles.statusDot}></span>
                  <span>Regime classification</span>
                </div>
                <div className={styles.statusRow}>
                  <span className={styles.statusDot}></span>
                  <span>Fair value computation</span>
                </div>
              </div>
              <div className={styles.engineGlow}></div>
            </div>
          </div>

          {/* Connection Path Right */}
          <div className={styles.connectionWrapper}>
            <div className={styles.connectionPathRight}>
              <div className={styles.connectionLine}></div>
              <div className={styles.connectionGlow}></div>
              <div className={styles.pulseOrb} style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>

          {/* Output Node */}
          <div className={styles.flowNode}>
            <div className={styles.flowBox}>
              <div className={styles.nodeHeader}>
                <span className={styles.nodeIcon}>🤖</span>
                <span className={styles.nodeLabel}>OUTPUT</span>
              </div>
              <h3>Your Bot</h3>
              <div className={styles.codeBlock}>
                <div className={styles.codeLine}>
                  <span className={styles.codeKey}>response</span>: {'{'}
                </div>
                <div className={styles.codeLine + ' ' + styles.indent}>
                  <span className={styles.codeKey}>regime</span>: <span className={styles.codeString}>"trend"</span>,
                </div>
                <div className={styles.codeLine + ' ' + styles.indent}>
                  <span className={styles.codeKey}>fair_value</span>: <span className={styles.codeNumber}>598.42</span>,
                </div>
                <div className={styles.codeLine + ' ' + styles.indent}>
                  <span className={styles.codeKey}>drift_1h</span>: <span className={styles.codeNumber}>+0.12</span>
                </div>
                <div className={styles.codeLine}>{'}'}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.footerText}>
            <span className={styles.codeComment}>// Pay per request via x402 • ~$0.05 USDC</span>
          </span>
        </div>
      </div>
    </section>
  );
}
