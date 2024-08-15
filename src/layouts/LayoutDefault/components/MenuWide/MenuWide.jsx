import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MenuWide.module.css';
import { TiHome } from 'react-icons/ti';
import { FaHistory } from 'react-icons/fa';

export default function MenuWide() {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        <TiHome />홈
      </NavLink>
      <NavLink
        to="/history"
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        <FaHistory />
        기록
      </NavLink>
    </nav>
  );
}
