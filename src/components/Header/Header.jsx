import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoArrowBackOutline } from 'react-icons/io5';
import { IoSearch } from 'react-icons/io5';
import { IoMoon } from 'react-icons/io5';
import { IoMdSunny } from 'react-icons/io';
import styles from './Header.module.css';
import { DarkModeContext } from '../../context/DarkModeContext';

export default function Header({ toggleMenu, toggleMobileMenu }) {
  const [isSearch, setIsSearch] = useState(false);
  const { isDark, toggleIsDark } = useContext(DarkModeContext);
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length === 0) return;
    navigate(`/search/${text}`);
  };

  return (
    <header
      className={`${styles.header} ${isSearch ? styles['search-on'] : ''}`}
    >
      <div className={styles.start}>
        <button className={styles.menuBtn} onClick={toggleMenu}>
          <RxHamburgerMenu />
        </button>
        <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>
          <RxHamburgerMenu />
        </button>
        <h1 className={styles.logo}>
          <Link to="/">
            <img src={`assets/logo${isDark ? '_dark' : ''}.png`} alt="metube" />
          </Link>
        </h1>
        <button
          className={styles.closeSearchBtn}
          onClick={() => {
            setIsSearch(false);
          }}
        >
          <IoArrowBackOutline />
        </button>
      </div>
      <form className={styles.center} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="검색"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button type="submit">
          <IoSearch />
        </button>
        <button
          type="button"
          onClick={() => {
            setIsSearch(true);
          }}
        >
          <IoSearch />
        </button>
      </form>
      <div className={styles.end}>
        <button
          className={`${styles.darkBtn} ${isDark ? styles.dark : ''}`}
          onClick={toggleIsDark}
        >
          {isDark ? <IoMdSunny /> : <IoMoon />}
        </button>
      </div>
    </header>
  );
}
