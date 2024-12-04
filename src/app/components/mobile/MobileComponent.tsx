'use client';

import styles1 from '../styles/newslist.module.css';
import { useEffect, useState, useRef } from 'react';
import BreakingNewsSlider from '../shared/breakingnewsslider';
import CategoryNewsList from '../shared/CategoryNewsList';
import Categories from '../shared/Categories';
import { articlesApi } from '../../services/api';

const categories = [
  'ALL', 'Politics', 'Art', 'Food', 'Fashion', 'Technology',
  'Science', 'Health', 'Travel', 'Business', 'Entertainment',
  'Education', 'Environment', 'Sports', 'Literature'
];

export default function MobileComponent() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const hasFetched = useRef<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = activeCategory === 'ALL' 
          ? await articlesApi.getAll()
          : await articlesApi.getByCategory(activeCategory || 'ALL');
        
        setNews(response);
      } catch (error) {
        console.error('Error fetching news:', error);
        alert(`Failed to fetch news: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    if (hasFetched.current !== activeCategory) {
      hasFetched.current = activeCategory || 'ALL';
      fetchNews();
    }
  }, [activeCategory]);

  useEffect(() => {
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryFromUrl = urlParams.get('category');
        setActiveCategory(categoryFromUrl && categories.includes(categoryFromUrl) ? categoryFromUrl : 'ALL');
    }
  }, []);

  const NewsListSkeleton = () => (
    <div className={styles1.newsList}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={`${styles1.newsItem} ${styles1.skeleton}`}>
          <div className={`${styles1.imageWrapper} ${styles1.skeletonImage}`} />
          <div className={styles1.newsContent}>
            <div className={`${styles1.skeletonTitle} ${styles1.skeletonAnimation}`} />
            <div className={styles1.meta}>
              <div className={`${styles1.skeletonMeta} ${styles1.skeletonAnimation}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <BreakingNewsSlider />
      <Categories setCategory={setActiveCategory} />
      {loading ? <NewsListSkeleton /> : <CategoryNewsList news={news} />
      }
    </>
  );
}