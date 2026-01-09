import React from 'react';
import styles from './ResponseTime.module.css';

export default function ResponseTime({ value }) {
  // Value is response time in milliseconds
  const isExcellent = value < 50;
  const isGood = value >= 50 && value < 100;
  
  return (
    <div className={styles.responseTime}>
      <div className={styles.responseValue}>
        {value}<span className={styles.responseUnit}>ms</span>
      </div>
      <div className={styles.responseBar}>
        <div 
          className={`${styles.responseFill} ${isExcellent ? styles.excellent : isGood ? styles.good : styles.normal}`}
          style={{ width: `${Math.min(100, (100 - value))}%` }}
        ></div>
      </div>
      <div className={styles.responseLabel}>Response Time</div>
    </div>
  );
}
