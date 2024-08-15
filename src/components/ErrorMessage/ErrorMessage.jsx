import React from 'react';
import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ txt }) {
  return <div className={styles.box}>error: {txt}</div>;
}
