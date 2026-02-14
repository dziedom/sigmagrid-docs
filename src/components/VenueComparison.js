import React from 'react';
import styles from './VenueComparison.module.css';

export default function VenueComparison({ ticker }) {
  // Calculate venue prices from static ticker data
  const venues = [
    { name: 'Hyperliquid', price: ticker.currentPrice * 1.0009, premium: 0.09 },
    { name: 'Avantis', price: ticker.currentPrice * 0.9993, premium: -0.07 },
    { name: 'Ostium', price: ticker.currentPrice * 1.0004, premium: 0.04 },
  ];

  const maxPrice = Math.max(...venues.map((v) => v.price), ticker.fairValue);
  const minPrice = Math.min(...venues.map((v) => v.price), ticker.fairValue);
  const range = maxPrice - minPrice || 1;

  return (
    <div className={styles.venueComparison}>
      <div className={styles.comparisonHeader}>
        <h3 className={styles.comparisonTitle}>Cross-Venue Comparison: {ticker.ticker}</h3>
        <div className={styles.comparisonSubtitle}>
          Prices relative to SigmaGrid Fair Value
        </div>
      </div>

      <div className={styles.comparisonChart}>
        {/* Fair Value Anchor Line */}
        <div className={styles.fairValueLine}>
          <div className={styles.fairValueLabel}>Fair Value</div>
          <div className={styles.fairValueBar}>
            <div
              className={styles.fairValueMarker}
              style={{
                left: `${((ticker.fairValue - minPrice) / range) * 100}%`,
              }}
            >
              <div className={styles.markerDot}></div>
              <div className={styles.markerLine}></div>
            </div>
          </div>
          <div className={styles.fairValuePrice}>${ticker.fairValue.toFixed(2)}</div>
        </div>

        {/* Venue Bars */}
        {venues.map((venue, idx) => {
          const fvPosition = ((ticker.fairValue - minPrice) / range) * 100;
          const venuePosition = ((venue.price - minPrice) / range) * 100;
          const isAboveFV = venue.price > ticker.fairValue;
          const distanceFromFV = Math.abs(venue.price - ticker.fairValue);
          const distancePercent = (distanceFromFV / range) * 100;

          return (
            <div key={venue.name} className={styles.venueRow}>
              <div className={styles.venueName}>{venue.name}</div>
              <div className={styles.venueBarContainer}>
                {isAboveFV ? (
                  <div
                    className={`${styles.venueBar} ${styles.aboveFV}`}
                    style={{
                      left: `${fvPosition}%`,
                      width: `${venuePosition - fvPosition}%`,
                    }}
                  >
                    <div className={styles.venuePrice}>${venue.price.toFixed(2)}</div>
                    <div className={styles.venuePremium}>
                      +{venue.premium.toFixed(2)}%
                    </div>
                  </div>
                ) : (
                  <div
                    className={`${styles.venueBar} ${styles.belowFV}`}
                    style={{
                      left: `${venuePosition}%`,
                      width: `${fvPosition - venuePosition}%`,
                    }}
                  >
                    <div className={styles.venuePrice}>${venue.price.toFixed(2)}</div>
                    <div className={styles.venuePremium}>
                      {venue.premium.toFixed(2)}%
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.comparisonFooter}>
        <div className={styles.footerNote}>
          <span className={styles.noteLabel}>Arbitrage Opportunity:</span>
          <span className={styles.noteValue}>
            {venues.find((v) => v.price === Math.min(...venues.map((v) => v.price)))?.name} →
            {venues.find((v) => v.price === Math.max(...venues.map((v) => v.price)))?.name}
          </span>
        </div>
      </div>
    </div>
  );
}
