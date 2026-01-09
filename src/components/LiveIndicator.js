import React from 'react';
import styles from './LiveIndicator.module.css';

export default function LiveIndicator({ label = 'Live Query Activity' }) {
  return (
    <div className={styles.liveIndicator} aria-label="Live activity indicator">
      <span className={styles.liveDot} aria-hidden="true"></span>
      <span>{label}</span>
    </div>
  );
}
