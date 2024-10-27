'use client';

import styles from './styles/header.module.css'

export default function Header() {
  return (
    <header className={styles.headerNav}>
      <nav>
        <button className={styles.menuBtn}>☰</button>
        <h1 className={styles.hstyle}>Discover</h1>
        <span className={styles.subheader}>News from all over the world</span>
      </nav>
    </header>
  );
}
