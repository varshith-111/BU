'use client';

import BreakingNewsSlider from "./components/breakingnewsslider";
import Categories from "./components/categories";
import NewsList from "./components/newslist";
import styles1 from './components/styles/newslist.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import https from 'https';

const categories = [
  'ALL', 'Politics', 'Art', 'Food', 'Fashion', 'Technology',
  'Science', 'Health', 'Travel', 'Business', 'Entertainment',
  'Education', 'Environment', 'Sports', 'Literature'
];

export default function Page() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('category');
    return categoryFromUrl && categories.includes(categoryFromUrl) ? categoryFromUrl : 'ALL';
  });

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const apiUrl = activeCategory === 'ALL' 
          ? `${baseUrl}/api/Articles/GetAll` 
          : `${baseUrl}/api/Articles/GetByCategory/${activeCategory}`;
        
        const agent = new https.Agent({  
          rejectUnauthorized: false 
        });

        const response = await axios.get(apiUrl, { httpsAgent: agent });
        setNews(response.data.data);
      } catch (error) {
        console.error('Error fetching news:', error);
        alert(`Failed to fetch news: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [activeCategory]);

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
      {loading ? <NewsListSkeleton /> : <NewsList news={news} />}
    </>
  );
}