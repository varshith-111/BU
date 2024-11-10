'use client';

import { useState, useRef, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './styles/categories.module.css';
import { useRouter, usePathname } from 'next/navigation';

export default function Categories({ setCategory }: { setCategory: (category: string) => void }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const tabsRef = useRef<HTMLUListElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const categories = [
    'ALL', 'Politics', 'Art', 'Food', 'Fashion', 'Technology',
    'Science', 'Health', 'Travel', 'Business', 'Entertainment',
    'Education', 'Environment', 'Sports', 'Literature'
  ];

  const checkArrows = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      checkArrows();
      window.addEventListener('resize', checkArrows);
      return () => window.removeEventListener('resize', checkArrows);
    }
  }, [categories]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryFromUrl = urlParams.get('category');
      if (categoryFromUrl && categories.includes(categoryFromUrl)) {
        setActiveCategory(categoryFromUrl);
      }
    }
  }, [pathname, router]);

  useEffect(() => {
    router.push(`${pathname}?category=${activeCategory}`);
  }, [activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCategory(category); // Update the category in the parent component
  };

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
              onClick={() => handleCategoryChange(category)}
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