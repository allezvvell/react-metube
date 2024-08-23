import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './MenuMobile.module.css';
import { RxHamburgerMenu } from 'react-icons/rx';
import { TiHome } from 'react-icons/ti';
import { FaHistory } from 'react-icons/fa';
import { DarkModeContext } from '../../../context/DarkModeContext';

const navList = [
  { to: '/', icon: <TiHome />, txt: '홈' },
  { to: '/history', icon: <FaHistory />, txt: '기록' },
];

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
          <Link to="/" onClick={toggleMenu}>
            <img
              src={`/assets/logo${isDark ? '_dark' : ''}.png`}
              alt="metube"
            />
          </Link>
        </div>
        <div className={styles.menu}>
          {navList.map((item, index) => (
            <NavLink
              to={item.to}
              onClick={toggleMenu}
              className={({ isActive }) => (isActive ? styles.active : '')}
              key={index}
            >
              {item.icon}
              {item.txt}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default MenuMobile;
