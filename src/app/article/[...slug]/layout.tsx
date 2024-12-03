'use client';
import React, { useEffect, useState, useRef } from "react";
import https from "https";
import axios from "axios";
import { NewsItem } from "@/app/types/newsItem";
import styles from "./layout.module.css";
import TopStories from "@/app/components/TopStories";
import CategoryNewsList from "@/app/components/shared/CategoryNewsList";
import LeftBlog from "@/app/components/desktop/LeftBlog";
import ArticleCategories from "@/app/components/shared/ArticleCategories";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const fetchArticlesByCategory = async (
  category: string,
  id: string
): Promise<NewsItem[]> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.get(`${baseUrl}/Articles/GetByCategory/${category}`);
    const articles = response.data?.data || [];

    if (articles.length <= 1) {
      const allResponse = await axios.get(`${baseUrl}/api/Articles/GetAll`, { httpsAgent });
      return allResponse.data?.data?.filter((article: NewsItem) => article.id !== id) || [];
    }

    return articles.filter((article: NewsItem) => article.id !== id);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

const useWindowWidth = (threshold: number): boolean | null => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

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
  
  // Ref to store previous category and id
  const prevCategoryRef = useRef<string>();
  const prevIdRef = useRef<string>();

  useEffect(() => {
    // Check if category or id has changed
    if (prevCategoryRef.current !== category || prevIdRef.current !== id) {
      console.log("Fetching articles for category:", category, "and id:", id);
      const fetchArticles = async () => {
        const articles = await fetchArticlesByCategory(category, id);
        setRelatedArticles(articles);
      };

      fetchArticles();

      // Update refs with current values
      prevCategoryRef.current = category;
      prevIdRef.current = id;
    }
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
    <>
    <ArticleCategories />
    <main className={isMobile === null ? undefined : isMobile ? undefined : styles.mainContainer}>
      {isMobile === null ? (
        <div>Loading...</div>
      ) : isMobile ? (
        <>
          {children}
          {MoreForYouHeader}
          <CategoryNewsList news={relatedArticles} />
        </>
      ) : (
        <>
          <div className={styles.leftContainer}>
          <LeftBlog articles={relatedArticles}/>
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
    </>
  );
}