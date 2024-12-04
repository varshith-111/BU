'use client';
import React, { useEffect, useState, useRef } from "react";
import styles from "./layout.module.css";
import TopStories from "@/app/components/TopStories";
import CategoryNewsList from "@/app/components/shared/CategoryNewsList";
import LeftBlog from "@/app/components/desktop/LeftBlog";
import ArticleCategories from "@/app/components/shared/ArticleCategories";
import { useArticles } from "@/app/context/ArticlesContext";

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
  const { relatedArticles, fetchArticles } = useArticles();
  const category = params.slug[1];
  const id = params.slug[0];
  const isMobile = useWindowWidth(768);
  
  // Ref to store previous category and id
  const prevCategoryRef = useRef<string>();
  const prevIdRef = useRef<string>();

  useEffect(() => {
    // Check if category or id has changed
    if (prevCategoryRef.current !== category || prevIdRef.current !== id) {
      console.log("Fetching articles for category:", category, "and id:", id);
      fetchArticles(category, id);

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