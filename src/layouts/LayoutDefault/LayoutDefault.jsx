import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styles from './LayoutDefault.module.css';
import MenuDefault from './components/MenuDefault/MenuDefault';
import MenuWide from './components/MenuWide/MenuWide';
import { useWindowSize } from '../../hooks/useWindowSize';
import MenuMobile from '../components/MenuMobile/MenuMobile';
import { useMobileMenu } from '../../hooks/useMobileMenu';

export default function LayoutDefault() {
  const windowSize = useWindowSize();
  const isMobile = windowSize <= 480;
  const [wideMenu, setWideMenu] = useState(false);
  const { mobileMenu, toggleMobileMenu } = useMobileMenu();
  const toggleMenu = () => {
    setWideMenu((prev) => !prev);
  };

  return (
    <div>
      <Header toggleMenu={toggleMenu} toggleMobileMenu={toggleMobileMenu} />
      {!isMobile && (
        <aside className={`${styles.aside}`}>
          {wideMenu ? <MenuWide /> : <MenuDefault />}
        </aside>
      )}
      <main
        className={`${styles.main} ${wideMenu ? styles.wide : ''} ${
          isMobile ? styles.mobile : ''
        }`}
      >
        <Outlet wideMenu={wideMenu} />
      </main>
      {isMobile && (
        <MenuMobile isOn={mobileMenu} toggleMenu={toggleMobileMenu} />
      )}
    </div>
  );
}
