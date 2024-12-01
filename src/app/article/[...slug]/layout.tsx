'use client';
import React, { useEffect, useState } from "react";
import https from "https";
import axios from "axios";
import { NewsItem } from "@/app/types/newsItem";
import styles from "./layout.module.css";
import TopStories from "@/app/components/TopStories";
import CategoryNewsList from "@/app/components/shared/CategoryNewsList";
import LeftBlog from "@/app/components/desktop/LeftBlog";

const BASE_URL = `https://thepostnews-aycjeyh6ffbaa5dm.canadacentral-01.azurewebsites.net`;
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const fetchArticlesByCategory = async (
  category: string,
  id: string
): Promise<NewsItem[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/Articles/GetByCategory/${category}`, { httpsAgent });
    const articles = response.data?.data || [];

    if (articles.length <= 1) {
      const allResponse = await axios.get(`${BASE_URL}/api/Articles/GetAll`, { httpsAgent });
      return allResponse.data?.data?.filter((article: NewsItem) => article.id !== id) || [];
    }

    return articles.filter((article: NewsItem) => article.id !== id);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

const useWindowWidth = (threshold: number): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= threshold);

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, [threshold]);

  return isMobile;
};

export default function ArticleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) {
  const category = params.slug[1];
  const id = params.slug[0];
  const [relatedArticles, setRelatedArticles] = useState<NewsItem[]>([]);
  const isMobile = useWindowWidth(768);

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await fetchArticlesByCategory(category, id);
      setRelatedArticles(articles);
    };

    fetchArticles();
  }, [category, id]);

  const MoreForYouHeader = (
    <h2
      style={{
        fontSize: "1.4rem",
        fontWeight: "500",
        margin: "1rem 0 0.5rem 0",
        padding: "0 1.5rem",
        color: "#333",
        borderLeft: "4px solid #3b82f6",
        paddingLeft: "1rem",
      }}
    >
      More For You
    </h2>
  );

  return (
    <main className={isMobile ? undefined : styles.mainContainer}>
      {isMobile ? (
        <>
          {children}
          {MoreForYouHeader}
          <CategoryNewsList news={relatedArticles} />
        </>
      ) : (
        <>
          <div className={styles.leftContainer}>
          <LeftBlog/>
          </div>
          <div className={styles.middleContainer}>
            {children}
            {MoreForYouHeader}
            <CategoryNewsList news={relatedArticles} />
          </div>
          <div className={styles.rightContainer}>
            <TopStories />
          </div>
        </>
      )}
    </main>
  );
}