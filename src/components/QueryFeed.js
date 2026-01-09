import React, { useState, useEffect } from 'react';
import LiveIndicator from './LiveIndicator';
import FreshnessMeter from './FreshnessMeter';
import styles from './QueryFeed.module.css';

// Mock query data based on actual SigmaGrid endpoints
const mockQueries = [
  {
    id: 1,
    botId: 'Bot_7f3a2k',
    endpoint: '/v1/signals/SPY',
    fields: { regime: 'trend', drift_1h: '+0.12', fair_value: '598.42' },
    cost: '0.02',
    timestamp: '2 seconds ago',
    responseTime: 43,
  },
  {
    id: 2,
    botId: 'Bot_k2m9x5',
    endpoint: '/v1/regime/QQQ',
    fields: { regime: 'LVOL', shock_index: '0.15' },
    cost: '0.02',
    timestamp: '8 seconds ago',
    responseTime: 38,
  },
  {
    id: 3,
    botId: 'Bot_5m1p3r',
    endpoint: '/v1/drift/TSLA',
    fields: { drift_1h: '-0.08', drift_overnight: '+0.03' },
    cost: '0.02',
    timestamp: '15 seconds ago',
    responseTime: 51,
  },
  {
    id: 4,
    botId: 'Bot_n3q8r5',
    endpoint: '/v1/events/SPY',
    fields: { event_next: 'FOMC', event_impact: 'high', event_bias: 'risk-off' },
    cost: '0.03',
    timestamp: '23 seconds ago',
    responseTime: 67,
  },
  {
    id: 5,
    botId: 'Bot_x9p2m1',
    endpoint: '/v1/premium/QQQ',
    fields: { premiums: 'hyperliquid: +0.05', 'aevo': '-0.02' },
    cost: '0.02',
    timestamp: '31 seconds ago',
    responseTime: 45,
  },
];

export default function QueryFeed() {
  const [queries, setQueries] = useState(mockQueries);

  // Simulate new queries appearing (optional - can be removed if static is preferred)
  useEffect(() => {
    const interval = setInterval(() => {
      // This could add new queries, but for now we'll keep it static
      // to match the template behavior
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.queryFeed}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <LiveIndicator />
          <h2 className={styles.sectionTitle}>Real-Time Signal Queries</h2>
          <p className={styles.sectionDescription}>
            Bots querying signals via x402 micropayments • What happens next is up to them
          </p>
        </div>

        <div className={styles.queryFeedContainer}>
          {queries.map((query) => (
            <div key={query.id} className={styles.queryCard}>
              <div className={styles.queryHeader}>
                <div className={styles.queryInfo}>
                  <div className={styles.queryMeta}>
                    <span className={styles.botId}>{query.botId}</span>
                    <span className={styles.queryText}>queried</span>
                    <span className={styles.signalName}>{query.endpoint}</span>
                    <span className={styles.costBadge}>{query.cost} USDC</span>
                  </div>
                  <div className={styles.queryFields}>
                    {Object.entries(query.fields).map(([key, value], idx) => (
                      <span key={idx} className={styles.fieldItem}>
                        {key}: <span className={styles.fieldValue}>{value}</span>
                        {idx < Object.entries(query.fields).length - 1 && ' • '}
                      </span>
                    ))}
                  </div>
                  <div className={styles.timestamp}>{query.timestamp}</div>
                </div>
                <FreshnessMeter responseTimeMs={query.responseTime} label="Response Time" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
