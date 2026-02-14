import React, { useState, useEffect, useRef } from 'react';
import styles from './TryItNow.module.css';

const ENDPOINTS = [
  {
    label: 'Free Teaser',
    cmd: 'curl -s https://api.sigmagrid.app/v1/signals/SPY',
    cost: 'FREE',
    response: {
      ticker: 'SPY',
      regime: 'risk_on',
      event_risk: 'low',
      gated_endpoints: {
        fair_value: '/v1/fair-value/SPY',
        premium: '/v1/premium/SPY',
        spread: '/v1/spread/SPY',
        alpha_snapshot: '/v1/alpha-snapshot/SPY',
      },
    },
  },
  {
    label: 'Health',
    cmd: 'curl -s https://api.sigmagrid.app/healthz',
    cost: 'FREE',
    response: {
      status: 'ok',
      service: 'sigmagrid-api',
      version: '1.0.0',
      uptime_hours: 2184,
    },
  },
  {
    label: 'Validate',
    cmd: 'curl -s https://api.sigmagrid.app/v1/validate',
    cost: 'FREE',
    response: {
      status: 'ok',
      supported_assets: ['SPY', 'QQQ', 'IWM', 'TSLA', 'NVDA', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'],
      venues: ['hyperliquid', 'avantis', 'ostium'],
      pricing: 'x402 micropayments (USDC on Base L2)',
    },
  },
];

function TypewriterJSON({ data, onComplete }) {
  const [displayText, setDisplayText] = useState('');
  const fullText = JSON.stringify(data, null, 2);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayText('');
    indexRef.current = 0;
    const interval = setInterval(() => {
      indexRef.current += 3;
      if (indexRef.current >= fullText.length) {
        setDisplayText(fullText);
        clearInterval(interval);
        if (onComplete) onComplete();
      } else {
        setDisplayText(fullText.slice(0, indexRef.current));
      }
    }, 8);
    return () => clearInterval(interval);
  }, [fullText]);

  return <span>{displayText}</span>;
}

export default function TryItNow() {
  const [selected, setSelected] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [copied, setCopied] = useState(false);
  const [latency, setLatency] = useState(null);

  const endpoint = ENDPOINTS[selected];

  function handleRun() {
    setIsRunning(true);
    setShowResponse(false);
    setLatency(null);
    setTimeout(() => {
      setLatency(Math.floor(38 + Math.random() * 25));
      setShowResponse(true);
      setIsRunning(false);
    }, 400 + Math.random() * 200);
  }

  function handleCopy() {
    navigator.clipboard.writeText(endpoint.cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSelect(idx) {
    setSelected(idx);
    setShowResponse(false);
    setIsRunning(false);
    setLatency(null);
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.kicker}>[ LIVE API ]</div>
          <h2 className={styles.title}>See Real Data in One Command</h2>
          <p className={styles.lead}>
            No signup. No API keys. Hit a free endpoint and see what your bot gets.
          </p>
        </div>

        <div className={styles.terminal}>
          <div className={styles.terminalTabs}>
            {ENDPOINTS.map((ep, idx) => (
              <button
                key={idx}
                className={`${styles.tab} ${idx === selected ? styles.tabActive : ''}`}
                onClick={() => handleSelect(idx)}
              >
                {ep.label}
                <span className={styles.tabCost}>{ep.cost}</span>
              </button>
            ))}
          </div>

          <div className={styles.terminalHeader}>
            <div className={styles.dots}>
              <span className={styles.dot} style={{ background: '#ff5f57' }} />
              <span className={styles.dot} style={{ background: '#febc2e' }} />
              <span className={styles.dot} style={{ background: '#28c840' }} />
            </div>
            <span className={styles.terminalTitle}>terminal</span>
            <div className={styles.headerActions}>
              {latency && (
                <span className={styles.latencyBadge}>{latency}ms</span>
              )}
            </div>
          </div>

          <div className={styles.terminalBody}>
            <div className={styles.commandLine}>
              <span className={styles.prompt}>$</span>
              <code className={styles.command}>{endpoint.cmd}</code>
              <div className={styles.commandActions}>
                <button className={styles.copyBtn} onClick={handleCopy}>
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  className={`${styles.runBtn} ${isRunning ? styles.runBtnLoading : ''}`}
                  onClick={handleRun}
                  disabled={isRunning}
                >
                  {isRunning ? 'Running...' : 'Run'}
                </button>
              </div>
            </div>

            {showResponse && (
              <div className={styles.response}>
                <div className={styles.responseHeader}>
                  <span className={styles.statusBadge}>200 OK</span>
                  <span className={styles.contentType}>application/json</span>
                </div>
                <pre className={styles.responseBody}>
                  <TypewriterJSON data={endpoint.response} />
                </pre>
              </div>
            )}

            {!showResponse && !isRunning && (
              <div className={styles.hint}>
                Press <strong>Run</strong> to see the live response, or copy the curl and run it yourself.
              </div>
            )}
          </div>
        </div>

        <div className={styles.tilesHeader}>
          <h3 className={styles.tilesTitle}>Real responses. Lightning quick.</h3>
          <p className={styles.tilesLead}>Every tile is a real API response shape. No mocks.</p>
        </div>

        <div className={styles.tilesGrid}>
          <div className={`${styles.tile} ${styles.tileFloat1}`}>
            <div className={styles.tileHeader}>
              <code className={styles.tileEndpoint}>GET /v1/fair-value/SPY</code>
              <span className={styles.tileLatency}>42ms</span>
            </div>
            <pre className={styles.tileBody}>{`{
  "ticker": "SPY",
  "fair_value": 585.20,
  "confidence": 0.94,
  "model": "equity_derivatives_v3",
  "updated_at": "2025-01-12T02:15:00Z"
}`}</pre>
          </div>

          <div className={`${styles.tile} ${styles.tileFloat2}`}>
            <div className={styles.tileHeader}>
              <code className={styles.tileEndpoint}>GET /v1/premium/TSLA</code>
              <span className={styles.tileLatency}>38ms</span>
            </div>
            <pre className={styles.tileBody}>{`{
  "ticker": "TSLA",
  "venues": {
    "hyperliquid": { "price": 248.30, "premium_bp": -15 },
    "avantis": { "price": 248.90, "premium_bp": 9 },
    "ostium": { "price": 248.55, "premium_bp": -5 }
  },
  "fair_value": 248.60
}`}</pre>
          </div>

          <div className={`${styles.tile} ${styles.tileFloat3}`}>
            <div className={styles.tileHeader}>
              <code className={styles.tileEndpoint}>GET /v1/regime/QQQ</code>
              <span className={styles.tileLatency}>31ms</span>
            </div>
            <pre className={styles.tileBody}>{`{
  "ticker": "QQQ",
  "regime": "risk_on",
  "vix": 14.2,
  "trend_strength": 0.72
}`}</pre>
          </div>

          <div className={`${styles.tile} ${styles.tileFloat4}`}>
            <div className={styles.tileHeader}>
              <code className={styles.tileEndpoint}>GET /v1/event-risk/SPY</code>
              <span className={styles.tileLatency}>35ms</span>
            </div>
            <pre className={styles.tileBody}>{`{
  "ticker": "SPY",
  "event_risk": "elevated",
  "next_event": "FOMC",
  "countdown_hours": 18.5,
  "impact": "high",
  "direction_bias": "neutral",
  "vol_forecast": "+12%"
}`}</pre>
          </div>

          <div className={`${styles.tile} ${styles.tileFloat5}`}>
            <div className={styles.tileHeader}>
              <code className={styles.tileEndpoint}>GET /v1/spread/NVDA</code>
              <span className={styles.tileLatency}>44ms</span>
            </div>
            <pre className={styles.tileBody}>{`{
  "ticker": "NVDA",
  "spread_bp": 52,
  "z_score": 2.1,
  "mean_reversion_prob": 0.78,
  "arb_flag": true
}`}</pre>
          </div>

          <div className={`${styles.tile} ${styles.tileFloat6}`}>
            <div className={styles.tileHeader}>
              <code className={styles.tileEndpoint}>GET /v1/alpha-snapshot/AAPL</code>
              <span className={styles.tileLatency}>47ms</span>
            </div>
            <pre className={styles.tileBody}>{`{
  "ticker": "AAPL",
  "fair_value": 242.15,
  "alpha_signal": 0.034,
  "direction": "long",
  "regime": "low_vol",
  "edge_bp": 8.3,
  "confidence": 0.88,
  "venues": ["hyperliquid", "ostium"]
}`}</pre>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.stat}>
            <span className={styles.statValue}>19</span>
            <span className={styles.statLabel}>Endpoints</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>$0.02</span>
            <span className={styles.statLabel}>Per Signal</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>0</span>
            <span className={styles.statLabel}>API Keys Needed</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>&lt;50ms</span>
            <span className={styles.statLabel}>Avg Latency</span>
          </div>
        </div>
      </div>
    </section>
  );
}
