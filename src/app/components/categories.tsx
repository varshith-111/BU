'use client';

import { useState, useRef, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './styles/categories.module.css';
import { useNews } from '../context/NewsContext';

export default function Categories() {
  const { category: activeCategory, setCategory: setActiveCategory } = useNews();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const tabsRef = useRef<HTMLUListElement>(null);

  const categories = [
    'Sports', 'Politics', 'Art', 'Food', 'Fashion', 'Technology',
    'Science', 'Health', 'Travel', 'Business', 'Entertainment',
    'Education', 'Environment', 'Music', 'Literature'
  ];

  const checkArrows = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1); // -1 to account for potential rounding errors
    }
  };

  useEffect(() => {
    checkArrows();
    window.addEventListener('resize', checkArrows);
    return () => window.removeEventListener('resize', checkArrows);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = tabsRef.current.clientWidth / 2;
      tabsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.stickyWrapper}>
      <section className={styles.categories}>
        {showLeftArrow && (
          <button className={`${styles.arrow} ${styles.leftArrow}`} onClick={() => scroll('left')}>
            <FiChevronLeft />
          </button>
        )}
        <ul 
          className={styles.tabs} 
          ref={tabsRef}
          onScroll={checkArrows}
        >
          {categories.map((category) => (
            <li
              key={category}
              className={activeCategory === category ? styles.active : ''}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
        {showRightArrow && (
          <button className={`${styles.arrow} ${styles.rightArrow}`} onClick={() => scroll('right')}>
            <FiChevronRight />
          </button>
        )}
      </section>
    </div>
  );
}
