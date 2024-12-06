'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/header.module.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const categories = [
    'ALL', 'Politics', 'Movies', 'Art', 'Food', 'Fashion', 'Technology',
    'Science', 'Health', 'Travel', 'Business', 'Entertainment',
    'Education', 'Environment', 'Sports', 'Literature'
  ];

  // New function to handle clicks outside the menu
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (isMenuOpen && !target.closest(`.${styles.menu}`) && !target.closest(`.${styles.menuBtn}`)) {
      setIsMenuOpen(false);
    }
  };

  // Effect to add/remove event listener
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.headerNav}>
      <nav>
        {/* <button className={styles.menuBtn} onClick={toggleMenu}>
          <div className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button> */}
        <a href="/?category=ALL" className={styles.anchor}>
          <h1 className={styles.hstyle}>Discover</h1>
        </a>
        <span className={styles.subheader}>News from all over the world</span>
      </nav>
      <div className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
        <ul 
          className={styles.tabs} 
        >
          {categories.map((category) => (
            <li key={category}>
              <Link
                href="/"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
