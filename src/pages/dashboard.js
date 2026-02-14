import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import DashboardTicker from '../components/DashboardTicker';
import VenueComparison from '../components/VenueComparison';
import EventCountdown from '../components/EventCountdown';
import styles from './dashboard.module.css';

// Base ticker data — prices fluctuate to simulate live feed
const baseTickers = [
  { ticker: 'SPY-PERP', fairValue: 585.20, currentPrice: 585.75, drift1h: 0.12, regime: 'TREND', confidence: 87 },
  { ticker: 'QQQ-PERP', fairValue: 432.15, currentPrice: 432.40, drift1h: -0.08, regime: 'CHOP', confidence: 82 },
  { ticker: 'IWM-PERP', fairValue: 198.50, currentPrice: 198.35, drift1h: 0.05, regime: 'TREND', confidence: 79 },
  { ticker: 'TSLA-PERP', fairValue: 248.30, currentPrice: 248.65, drift1h: -0.15, regime: 'HVOL', confidence: 75 },
  { ticker: 'NVDA-PERP', fairValue: 142.80, currentPrice: 142.95, drift1h: 0.22, regime: 'TREND', confidence: 91 },
  { ticker: 'AAPL-PERP', fairValue: 218.40, currentPrice: 218.25, drift1h: 0.08, regime: 'CHOP', confidence: 85 },
];

const events = [
  { name: 'FOMC Rate Decision', timeRemaining: { days: 2, hours: 14, minutes: 32 }, impact: 'HIGH', bias: 'risk-off', affectedTickers: ['SPY-PERP', 'QQQ-PERP', 'IWM-PERP'] },
  { name: 'CPI Release', timeRemaining: { days: 5, hours: 8, minutes: 15 }, impact: 'MEDIUM', bias: 'neutral', affectedTickers: ['SPY-PERP', 'QQQ-PERP'] },
  { name: 'NVDA Earnings', timeRemaining: { days: 12, hours: 3, minutes: 0 }, impact: 'HIGH', bias: 'risk-on', affectedTickers: ['NVDA-PERP'] },
];

function jitter(value, maxPct = 0.0003) {
  return value * (1 + (Math.random() - 0.5) * 2 * maxPct);
}

export default function Dashboard() {
  const [tickers, setTickers] = useState(baseTickers);
  const [selectedTicker, setSelectedTicker] = useState('SPY-PERP');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [queryCount, setQueryCount] = useState(1247);

  const updatePrices = useCallback(() => {
    setTickers(prev =>
      prev.map(t => ({
        ...t,
        currentPrice: parseFloat(jitter(t.currentPrice).toFixed(2)),
        drift1h: parseFloat((t.drift1h + (Math.random() - 0.5) * 0.02).toFixed(2)),
        confidence: Math.min(99, Math.max(60, t.confidence + Math.floor((Math.random() - 0.5) * 2))),
      }))
    );
    setLastUpdate(new Date());
    setQueryCount(prev => prev + Math.floor(1 + Math.random() * 3));
  }, []);

  useEffect(() => {
    const interval = setInterval(updatePrices, 3000);
    return () => clearInterval(interval);
  }, [updatePrices]);

  const selectedTickerData = tickers.find((t) => t.ticker === selectedTicker);
  const timeStr = lastUpdate.toLocaleTimeString();

  const winRate = 67.3 + (Math.random() - 0.5) * 0.4;
  const avgEdge = 5.2 + (Math.random() - 0.5) * 0.3;

  return (
    <Layout
      title="Live Dashboard — SigmaGrid"
      description="Live institutional fair value signals for crypto perpetual markets. View accuracy metrics, cross-venue comparisons, and event tracking."
    >
      <div className={styles.dashboard}>
        {/* Header Bar */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Link to="/" className={styles.logoLink}>
              <span className={styles.logo}>&Sigma;</span>
              <span className={styles.logoText}>SigmaGrid</span>
            </Link>
            <span className={styles.headerTitle}>Signal Dashboard</span>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.liveIndicator}>
              <span className={styles.liveDot}></span>
              Live
            </div>
            <span className={styles.updateTime}>Updated {timeStr}</span>
          </div>
        </div>

        {/* Performance Summary */}
        <div className={styles.performanceBar}>
          <div className={styles.metric}>
            <div className={styles.metricLabel}>Win Rate vs Baseline</div>
            <div className={styles.metricValue}>{winRate.toFixed(1)}%</div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metricLabel}>Average Edge</div>
            <div className={styles.metricValue}>{avgEdge.toFixed(1)} bp</div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metricLabel}>Predictions Today</div>
            <div className={styles.metricValue}>{queryCount.toLocaleString()}</div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Left Column - Fair Value Signals */}
          <div className={styles.signalsColumn}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Fair Value Signals</h2>
              <div className={styles.sectionSubtitle}>
                Institutional fair value vs live market prices — updates every 3s
              </div>
            </div>

            <div className={styles.tableContainer}>
              <table className={styles.signalsTable}>
                <thead>
                  <tr>
                    <th>Ticker</th>
                    <th>Fair Value</th>
                    <th>Current Price</th>
                    <th>Premium/Discount</th>
                    <th>Drift 1h</th>
                    <th>Regime</th>
                    <th>Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {tickers.map((ticker) => (
                    <DashboardTicker
                      key={ticker.ticker}
                      ticker={ticker}
                      isSelected={ticker.ticker === selectedTicker}
                      onSelect={() => setSelectedTicker(ticker.ticker)}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cross-Venue Comparison */}
            {selectedTickerData && (
              <VenueComparison ticker={selectedTickerData} />
            )}
          </div>

          {/* Right Sidebar */}
          <div className={styles.sidebar}>
            {/* Quick Try */}
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Try the API</h3>
              <div className={styles.quickTry}>
                <code className={styles.curlCommand}>
                  curl https://api.sigmagrid.app/v1/signals/SPY
                </code>
                <Link to="/docs/api-reference" className={styles.apiLink}>
                  Full API Docs
                </Link>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Upcoming Events</h3>
              <div className={styles.eventsList}>
                {events.map((event, idx) => (
                  <EventCountdown key={idx} event={event} />
                ))}
              </div>
            </div>

            {/* Regime Overview */}
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Regime Overview</h3>
              <div className={styles.regimeCard}>
                <div className={styles.regimeRow}>
                  <span className={styles.regimeLabel}>Current Regime:</span>
                  <span className={styles.regimeValue}>TREND</span>
                </div>
                <div className={styles.regimeRow}>
                  <span className={styles.regimeLabel}>Vol Forecast 1h:</span>
                  <span className={styles.regimeValue}>0.8%</span>
                </div>
                <div className={styles.regimeRow}>
                  <span className={styles.regimeLabel}>Vol Forecast 4h:</span>
                  <span className={styles.regimeValue}>1.2%</span>
                </div>
                <div className={styles.regimeRow}>
                  <span className={styles.regimeLabel}>Shock Index:</span>
                  <span className={styles.regimeValue}>0.3 (low)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
