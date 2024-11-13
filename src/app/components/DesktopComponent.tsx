"use client";

import styles1 from "./styles/newslist.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import https from "https";
import styles from "./styles/desktop.module.css";
import Categories from "./categories";
import DesktopArticleLayout from "./DesktopArticleLayout";
import TopLayout from "./topLayout";
import ThreeHundTwoFifty from "./advertisment/ThreeHundTwoFifty/ThreeHundTwoFifty";

const categories = [
  "ALL",
  "Politics",
  "Art",
  "Food",
  "Fashion",
  "Technology",
  "Science",
  "Health",
  "Travel",
  "Business",
  "Entertainment",
  "Education",
  "Environment",
  "Sports",
  "Literature",
];

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

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const baseUrl = `https://thepostnews-aycjeyh6ffbaa5dm.canadacentral-01.azurewebsites.net/`;
        const apiUrl =
          activeCategory === "ALL"
            ? `${baseUrl}/api/Articles/GetAll`
            : `${baseUrl}/api/Articles/GetByCategory/${activeCategory}`;

        const agent = new https.Agent({
          rejectUnauthorized: false,
        });

        const response = await axios.get(apiUrl, { httpsAgent: agent });
        setNews(response.data.data);
      } catch (error) {
        console.error("Error fetching news:", error);
        alert(`Failed to fetch news: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
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
            <DesktopArticleLayout articles={news} />
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
