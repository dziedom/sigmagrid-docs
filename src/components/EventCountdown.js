import React from 'react';
import styles from './EventCountdown.module.css';

export default function EventCountdown({ event }) {
  // Use static time remaining (sample data)
  const timeRemaining = event.timeRemaining;

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'HIGH':
        return '#ef4444';
      case 'MEDIUM':
        return '#f59e0b';
      case 'LOW':
        return '#94a3b8';
      default:
        return '#94a3b8';
    }
  };

  const getBiasColor = (bias) => {
    switch (bias) {
      case 'risk-on':
        return '#22c55e';
      case 'risk-off':
        return '#ef4444';
      default:
        return '#94a3b8';
    }
  };

  return (
    <div className={styles.eventCard}>
      <div className={styles.eventHeader}>
        <div className={styles.eventName}>{event.name}</div>
        <div
          className={styles.impactBadge}
          style={{ borderColor: getImpactColor(event.impact), color: getImpactColor(event.impact) }}
        >
          {event.impact}
        </div>
      </div>

      <div className={styles.countdown}>
        <div className={styles.timeUnit}>
          <div className={styles.timeValue}>{timeRemaining.days}</div>
          <div className={styles.timeLabel}>days</div>
        </div>
        <div className={styles.timeSeparator}>:</div>
        <div className={styles.timeUnit}>
          <div className={styles.timeValue}>{timeRemaining.hours}</div>
          <div className={styles.timeLabel}>hours</div>
        </div>
        <div className={styles.timeSeparator}>:</div>
        <div className={styles.timeUnit}>
          <div className={styles.timeValue}>{timeRemaining.minutes}</div>
          <div className={styles.timeLabel}>min</div>
        </div>
      </div>

      <div className={styles.eventDetails}>
        <div className={styles.biasIndicator}>
          <span className={styles.biasLabel}>Bias:</span>
          <span
            className={styles.biasValue}
            style={{ color: getBiasColor(event.bias) }}
          >
            {event.bias}
          </span>
        </div>
        <div className={styles.affectedTickers}>
          <span className={styles.tickersLabel}>Affects:</span>
          <span className={styles.tickersList}>
            {event.affectedTickers.join(', ')}
          </span>
        </div>
      </div>
    </div>
  );
}
