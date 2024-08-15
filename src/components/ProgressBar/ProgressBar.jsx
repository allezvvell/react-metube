import React from 'react';
import styles from './ProgressBar.module.css';

export default function ProgressBar({ width }) {
  return (
    <div className={styles.bar}>
      <div className={styles.fill} style={{ width: `${width}px` }}></div>
    </div>
  );
}
