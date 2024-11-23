'use client';

import React from 'react';
import styles from '../styles/DesktopArticleLayout.module.css'; // Create this CSS file for styling
import { NewsItem } from '../../types/newsItem';
import CategoryNewsCard from '../shared/CategoryNewsCard';

interface DesktopCategoriesLayoutProps {
  articles: NewsItem[];
}

const DesktopCategoriesLayout: React.FC<DesktopCategoriesLayoutProps> = ({ articles }) => {
  return (
    <div className={styles.container}>
      {articles.map((article) => (
        <CategoryNewsCard key={article.id} newsItem={article} />
      ))}
    </div>
  );
};

export default DesktopCategoriesLayout; 