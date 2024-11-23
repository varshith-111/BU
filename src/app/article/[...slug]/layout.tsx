'use client';
import NewsList from "@/app/components/newslist";
import React, { useEffect, useState } from "react";
import https from "https";
import axios from "axios";
import { NewsItem } from "@/app/types/newsItem";
import styles from "./layout.module.css";
import TopStories from "@/app/components/TopStories";
//import CardView from "@/app/components/CardView";

// Function to fetch articles by category
const fetchArticlesByCategory = async (
  category: string,
  id: string
): Promise<NewsItem[]> => {
  const baseUrl = `https://thepostnews-aycjeyh6ffbaa5dm.canadacentral-01.azurewebsites.net`;

  try {
    // Fetch articles by category
    const response = await axios.get(`${baseUrl}/api/Articles/GetByCategory/${category}`, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
    const jsonData = response.data;

    // If no articles or only one article, fetch all articles
    if (!jsonData.data?.length || jsonData.data.length <= 1) {
      const allResponse = await axios.get(`${baseUrl}/api/Articles/GetAll`, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });
      const allJsonData = allResponse.data;

      // Filter out the current article
      return allJsonData.data?.filter((article: NewsItem) => article.id !== id) || [];
    }

    // Filter out the current article from the fetched category articles
    return jsonData.data.filter((article: NewsItem) => article.id !== id);
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw new Error(`Error fetching articles: ${error}`);
  }
};

// Main layout component
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

  // Fetch articles when the component mounts or the category/id changes
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await fetchArticlesByCategory(category, id);
        setRelatedArticles(articles);
      } catch (error) {
        console.error("Error fetching related articles:", error);
      }
    };

    fetchArticles();
  }, [category, id]);

  const [isMobile, setIsMobile] = useState(false);

  // Handle responsiveness
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <main>
          {children}
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
          <NewsList news={relatedArticles} />
        </main>
      ) : (
        <main className={styles.mainContainer}>
          <div className={styles.leftContainer}>
            {relatedArticles.map((article) => (
              <div></div>
            ))}
          </div>
          <div className={styles.middleContainer}>
            {children}
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
          <NewsList news={relatedArticles} />
          </div>
          <div className={styles.rightContainer}>
            <TopStories/>
          </div>
         </main>
      )}
    </>
  );
}
