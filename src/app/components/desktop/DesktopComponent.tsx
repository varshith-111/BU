"use client";

import styles1 from "../styles/newslist.module.css";
import { useEffect, useState, useRef } from "react";
import styles from "../styles/desktop.module.css";
import Categories from "../shared/Categories";
import TopLayout from "../topLayout";
import ThreeHundTwoFifty from "../advertisment/ThreeHundTwoFifty/ThreeHundTwoFifty";
import DesktopCategoriesLayout from "./DesktopCategoriesLayout";
import { articlesApi } from "@/app/services/api";

const categories = ['Politics','Movies', 'Sports','Health', 'Business', 'Entertainment'];

export default function DesktopComponent() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(() => {
    const isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryFromUrl = urlParams.get("category");
      return categoryFromUrl && categories.includes(categoryFromUrl)
        ? categoryFromUrl
        : "ALL";
    }
  });
  

  const hasFetched = useRef<string | null>(null); // Track fetched category

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = activeCategory === 'ALL' 
        ? await articlesApi.getAll()
        : await articlesApi.getByCategory(activeCategory || 'ALL');
        setNews(response);
      } catch (error) {
        console.error("Error fetching news:", error);
        alert(`Failed to fetch news: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    // Check if news has already been fetched for the current category
    if (hasFetched.current !== activeCategory) {
      console.log('activeCategory------------------------');
      console.log(activeCategory);
      hasFetched.current = activeCategory || "ALL"; // Update the fetched category
      fetchNews();
    }
  }, [activeCategory]);

  useEffect(() => {
    const isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryFromUrl = urlParams.get("category");
      setActiveCategory(
        categoryFromUrl && categories.includes(categoryFromUrl)
          ? categoryFromUrl
          : "ALL"
      );
    }
  }, []);

  const NewsListSkeleton = () => (
    <div className={`${styles1.newsList} ${styles1.newsList1}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`${styles1.newsItem} ${styles1.skeleton} ${styles1.newsItem1}`}
        >
          <div className={`${styles1.imageWrapper} ${styles1.skeletonImage}`} />
          <div className={styles1.newsContent}>
            <div
              className={`${styles1.skeletonTitle} ${styles1.skeletonAnimation}`}
            />
            <div className={styles1.meta}>
              <div
                className={`${styles1.skeletonMeta} ${styles1.skeletonAnimation}`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <TopLayout />
          <Categories setCategory={setActiveCategory} />
          {loading ? (
            <NewsListSkeleton />
          ) : (
            <>
            <DesktopCategoriesLayout articles={news} />
            </>
          )}
        </div>
        <div className={styles.rightPanel}>
        <ThreeHundTwoFifty/>
        <ThreeHundTwoFifty/>
        <ThreeHundTwoFifty/>
        </div>
      </div>
    </>
  );
}
