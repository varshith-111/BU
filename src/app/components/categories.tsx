'use client';

import { useState } from 'react';
import styles from './styles/categories.module.css';

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState('Sports');

  const categories = ['Sports', 'Politics', 'Art', 'Food', 'Fashion'];

  return (
    <section className={styles.categories}>
      <ul className={styles.tabs}>
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
    </section>
  );
}