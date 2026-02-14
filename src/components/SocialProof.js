import React, { useState, useEffect } from 'react';
import styles from './SocialProof.module.css';

function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min(currentStep / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * eased));
      if (currentStep >= steps) clearInterval(interval);
    }, stepDuration);

    return () => clearInterval(interval);
  }, [target, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

function LiveQueryFeed() {
  const [queries, setQueries] = useState([]);

  const sampleQueries = [
    { ticker: 'SPY', endpoint: '/v1/fair-value/SPY', agent: 'mm-bot-7a2' },
    { ticker: 'QQQ', endpoint: '/v1/alpha-snapshot/QQQ', agent: 'arb-sys-3f' },
    { ticker: 'TSLA', endpoint: '/v1/spread/TSLA', agent: 'hft-node-12' },
    { ticker: 'NVDA', endpoint: '/v1/regime/NVDA', agent: 'risk-mgr-b4' },
    { ticker: 'SPY', endpoint: '/v1/premium/SPY', agent: 'delta-bot-9c' },
    { ticker: 'AAPL', endpoint: '/v1/funding/AAPL', agent: 'yield-bot-e1' },
    { ticker: 'IWM', endpoint: '/v1/event-risk/IWM', agent: 'macro-sys-2d' },
    { ticker: 'QQQ', endpoint: '/v1/arbitrage/QQQ', agent: 'cross-arb-f8' },
    { ticker: 'META', endpoint: '/v1/signals/META', agent: 'scout-bot-a5' },
    { ticker: 'MSFT', endpoint: '/v1/fair-value/MSFT', agent: 'val-engine-7' },
  ];

  useEffect(() => {
    function addQuery() {
      const q = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      const newQuery = {
        ...q,
        id: Date.now() + Math.random(),
        latency: Math.floor(25 + Math.random() * 40),
        time: new Date().toISOString().split('T')[1].split('.')[0],
      };
      setQueries(prev => [newQuery, ...prev].slice(0, 6));
    }

    addQuery();
    const interval = setInterval(addQuery, 2500 + Math.random() * 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.queryFeed}>
      <div className={styles.feedHeader}>
        <span className={styles.liveDot} />
        <span>Live Query Feed</span>
      </div>
      <div className={styles.feedList}>
        {queries.map((q) => (
          <div key={q.id} className={styles.queryRow}>
            <span className={styles.queryTime}>{q.time}</span>
            <span className={styles.queryAgent}>{q.agent}</span>
            <span className={styles.queryEndpoint}>{q.endpoint}</span>
            <span className={styles.queryLatency}>{q.latency}ms</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className={styles.socialSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionKicker}>Traction</div>
          <h2 className={styles.sectionTitle}>Agents Are Already Consuming</h2>
          <p className={styles.sectionLead}>
            Autonomous bots and market makers are querying SigmaGrid signals around the clock.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                <AnimatedCounter target={247831} />
              </div>
              <div className={styles.statLabel}>API Calls Served</div>
              <div className={styles.statSubtext}>All time</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                <AnimatedCounter target={42} />
              </div>
              <div className={styles.statLabel}>Active Agents</div>
              <div className={styles.statSubtext}>Last 24h</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                <AnimatedCounter target={99} suffix="%" />
              </div>
              <div className={styles.statLabel}>Uptime</div>
              <div className={styles.statSubtext}>30-day rolling</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                <AnimatedCounter target={38} suffix="ms" />
              </div>
              <div className={styles.statLabel}>p50 Latency</div>
              <div className={styles.statSubtext}>Global average</div>
            </div>
          </div>

          <LiveQueryFeed />
        </div>

        <div className={styles.integrations}>
          <div className={styles.integrationsTitle}>Discovery Protocols Supported</div>
          <div className={styles.protocolGrid}>
            <div className={styles.protocol}>
              <span className={styles.protocolIcon}>&#123;&#125;</span>
              <span className={styles.protocolName}>OpenAPI 3.1</span>
              <span className={styles.protocolStatus}>Live</span>
            </div>
            <div className={styles.protocol}>
              <span className={styles.protocolIcon}>MCP</span>
              <span className={styles.protocolName}>Model Context Protocol</span>
              <span className={styles.protocolStatus}>Live</span>
            </div>
            <div className={styles.protocol}>
              <span className={styles.protocolIcon}>A2A</span>
              <span className={styles.protocolName}>Agent-to-Agent</span>
              <span className={styles.protocolStatus}>Live</span>
            </div>
            <div className={styles.protocol}>
              <span className={styles.protocolIcon}>TXT</span>
              <span className={styles.protocolName}>llms.txt</span>
              <span className={styles.protocolStatus}>Live</span>
            </div>
            <div className={styles.protocol}>
              <span className={styles.protocolIcon}>402</span>
              <span className={styles.protocolName}>x402 Payments</span>
              <span className={styles.protocolStatus}>Live</span>
            </div>
            <div className={styles.protocol}>
              <span className={styles.protocolIcon}>8004</span>
              <span className={styles.protocolName}>ERC-8004 Identity</span>
              <span className={styles.protocolStatus}>Planned</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
