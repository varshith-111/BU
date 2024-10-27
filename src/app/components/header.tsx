'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './styles/header.module.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.headerNav}>
      <nav>
        <button className={styles.menuBtn} onClick={toggleMenu}>
          <div className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <Link href="/" className={styles.anchor}>
          <h1 className={styles.hstyle}>Discover</h1>
        </Link>
        <span className={styles.subheader}>News from all over the world</span>
      </nav>
      <div className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Categories</a></li>
          <li><a href="#">Trending</a></li>
          <li><a href="#">Bookmarks</a></li>
          <li><a href="#">Profile</a></li>
        </ul>
      </div>
    </header>
  );
}
