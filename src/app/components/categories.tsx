'use client';

import { useState } from 'react';
import './styles/categories.css';

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState('Sports');

  const categories = ['Sports', 'Politics', 'Art', 'Food', 'Fashion'];

  return (
    <section className="categories">
      <ul className="tabs">
        {categories.map((category) => (
          <li
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </section>
  );
}