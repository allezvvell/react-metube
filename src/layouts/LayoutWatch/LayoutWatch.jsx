import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styles from './LayoutWatch.module.css';
import MenuMobile from '../components/MenuMobile/MenuMobile';
import { useMobileMenu } from '../../hooks/useMobileMenu';

export default function LayoutWatch() {
  const { mobileMenu, toggleMobileMenu } = useMobileMenu();
  return (
    <div>
      <Header
        toggleMenu={toggleMobileMenu}
        toggleMobileMenu={toggleMobileMenu}
      />
      <main className={styles.main}>
        <Outlet />
      </main>
      <MenuMobile isOn={mobileMenu} toggleMenu={toggleMobileMenu} />
    </div>
  );
}
