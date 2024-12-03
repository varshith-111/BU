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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // New function to handle clicks outside the menu
  const handleClickOutside = (event: any) => {
    if (isMenuOpen && !event.target.closest(`.${styles.menu}`) && !event.target.closest(`.${styles.menuBtn}`)) {
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
        <ul 
          className={styles.tabs} 
        >
          {categories.map((category) => (
            <li key={category}>
              <a
                href={`/?category=${category}`}
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
