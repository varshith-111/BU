'use client';
import styles from './styles/searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles.searchContainer}>
      <div className={`${styles.searchBar} ${isFocused ? styles.focused : ''}`}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
}