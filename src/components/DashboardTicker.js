import React, { useState, useEffect } from 'react';
import styles from './DashboardTicker.module.css';

export default function DashboardTicker({ ticker, isSelected, onSelect }) {
  const [priceChange, setPriceChange] = useState(null);
  const [prevPrice, setPrevPrice] = useState(ticker.currentPrice);

  useEffect(() => {
    if (ticker.currentPrice !== prevPrice) {
      const change = ticker.currentPrice - prevPrice;
      setPriceChange(change);
      setPrevPrice(ticker.currentPrice);
      
      // Clear the flash effect after animation
      setTimeout(() => setPriceChange(null), 600);
    }
  }, [ticker.currentPrice, prevPrice]);

  const premium = ((ticker.currentPrice - ticker.fairValue) / ticker.fairValue) * 100;
  const isCheap = premium < 0;
  const isRich = premium > 0;

  const getRegimeColor = (regime) => {
    switch (regime) {
      case 'TREND':
        return '#3b82f6';
      case 'CHOP':
        return '#8b5cf6';
      case 'HVOL':
        return '#f59e0b';
      default:
        return '#94a3b8';
    }
  };

  return (
    <tr
      className={`${styles.tickerRow} ${isSelected ? styles.selected : ''}`}
      onClick={onSelect}
    >
      <td className={styles.tickerCell}>
        <span className={styles.tickerSymbol}>{ticker.ticker}</span>
      </td>
      <td className={styles.fairValueCell}>
        <span className={styles.fairValue}>${ticker.fairValue.toFixed(2)}</span>
      </td>
      <td className={styles.priceCell}>
        <span
          className={`${styles.currentPrice} ${
            priceChange !== null
              ? priceChange > 0
                ? styles.priceUp
                : styles.priceDown
              : ''
          }`}
        >
          ${ticker.currentPrice.toFixed(2)}
        </span>
      </td>
      <td className={styles.premiumCell}>
        <span
          className={`${styles.premium} ${
            isCheap ? styles.cheap : isRich ? styles.rich : styles.neutral
          }`}
        >
          {isCheap ? '↓' : isRich ? '↑' : '—'} {Math.abs(premium).toFixed(2)}%
        </span>
      </td>
      <td className={styles.driftCell}>
        <span
          className={`${styles.drift} ${
            ticker.drift1h > 0 ? styles.driftUp : ticker.drift1h < 0 ? styles.driftDown : styles.driftNeutral
          }`}
        >
          {ticker.drift1h > 0 ? '↗' : ticker.drift1h < 0 ? '↘' : '→'} {Math.abs(ticker.drift1h).toFixed(2)}%
        </span>
      </td>
      <td className={styles.regimeCell}>
        <span
          className={styles.regimeBadge}
          style={{ borderColor: getRegimeColor(ticker.regime), color: getRegimeColor(ticker.regime) }}
        >
          {ticker.regime}
        </span>
      </td>
      <td className={styles.confidenceCell}>
        <div className={styles.confidenceBar}>
          <div
            className={styles.confidenceFill}
            style={{ width: `${ticker.confidence}%` }}
          ></div>
          <span className={styles.confidenceText}>{ticker.confidence}%</span>
        </div>
      </td>
    </tr>
  );
}
