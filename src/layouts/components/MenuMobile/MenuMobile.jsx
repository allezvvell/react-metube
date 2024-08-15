import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './MenuMobile.module.css';
import { RxHamburgerMenu } from 'react-icons/rx';
import { TiHome } from 'react-icons/ti';
import { FaHistory } from 'react-icons/fa';
import { DarkModeContext } from '../../../context/DarkModeContext';

const MenuMobile = ({ isOn, toggleMenu }) => {
  const { isDark } = useContext(DarkModeContext);
  return (
    <>
      <div className={`${styles.background} ${isOn ? styles.on : ''}`}></div>
      <nav className={`${styles.nav} ${isOn ? styles.on : ''}`}>
        <div className={styles.header}>
          <button onClick={toggleMenu}>
            <RxHamburgerMenu />
          </button>
          <Link>
            <img src={`assets/logo${isDark ? '_dark' : ''}.png`} alt="metube" />
          </Link>
        </div>
        <div className={styles.menu}>
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
        </div>
      </nav>
    </>
  );
};

export default MenuMobile;
