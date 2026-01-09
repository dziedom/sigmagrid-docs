import React from 'react';
import styles from './FreshnessMeter.module.css';

export default function FreshnessMeter({ responseTimeMs, label = 'Response Time' }) {
  // Response time in milliseconds (e.g., 43ms)
  // Convert to a visual meter: faster = more filled (inverse relationship)
  // Fast (< 50ms) = 100%, Medium (50-100ms) = 80-100%, Slow (> 100ms) = 50-80%
  const getPercentage = (ms) => {
    if (ms < 50) return 100;
    if (ms < 100) return 100 - ((ms - 50) / 50) * 20; // 100% to 80%
    if (ms < 200) return 80 - ((ms - 100) / 100) * 30; // 80% to 50%
    return 50;
  };
  
  const percentage = getPercentage(responseTimeMs);
  const speedText = responseTimeMs < 50 ? 'Very fast' : 
                    responseTimeMs < 100 ? 'Fast' : 
                    responseTimeMs < 200 ? 'Normal' : 
                    'Acceptable';

  return (
    <div className={styles.freshnessScore}>
      <div className={styles.freshnessValue}>{responseTimeMs}ms</div>
      <div className={styles.freshnessMeter}>
        <div 
          className={styles.freshnessFill} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className={styles.freshnessLabel}>{label}</div>
      <div className={styles.freshnessText}>{speedText}</div>
    </div>
  );
}
