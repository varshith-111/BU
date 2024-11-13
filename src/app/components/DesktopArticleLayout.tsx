'use client';

import React from 'react';
import ArticleCard from './ArticleCard';
import styles from './styles/DesktopArticleLayout.module.css'; // Create this CSS file for styling
import { NewsItem } from '../types/newsItem';

interface DesktopArticleLayoutProps {
  articles: NewsItem[];
}

const DesktopArticleLayout: React.FC<DesktopArticleLayoutProps> = ({ articles }) => {
  return (
    <div className={styles.container}>
      {articles.map((article) => (
        <ArticleCard key={article.id} newsItem={article} />
      ))}
    </div>
  );
};

export default DesktopArticleLayout; 