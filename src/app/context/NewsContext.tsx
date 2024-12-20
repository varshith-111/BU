'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import https from 'https';

// Local type definition
interface NewsContextItem {
  id: string;
  imageUrl: string[];
  title: string;
  category: string;
  description: string;
  header: string;
  publishedOn: string;
  publishedBy: string;
}

// Add API response type
type ApiResponse = {
  data: NewsContextItem[];
  status: boolean;
  message: string;
  responceCode: string;
};

type NewsContextType = {
  news: NewsContextItem[];
  category: string;
  setCategory: (category: string) => void;
  loading: boolean;
  newsItem: NewsContextItem | null;
  setNewsItem: (item: NewsContextItem | null) => void;
};

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export function NewsProvider({ children }: { children: ReactNode }) {
  const [news, setNews] = useState<NewsContextItem[]>([]);
  const [category, setCategory] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('category') || 'ALL'; // Get category from URL or default to 'ALL'
    }
    return 'ALL';
  });
  const [loading, setLoading] = useState(false);
  const [newsItem, setNewsItem] = useState<NewsContextItem | null>(null);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        const baseUrl = 'https://20.205.138.193'; // Keep HTTPS
        const apiUrl = category === 'ALL' 
          ? `${baseUrl}/api/Articles/GetAll` 
          : `${baseUrl}/api/Articles/GetByCategory/${category}`;
        
        // Create an HTTPS agent that ignores certificate errors
        const agent = new https.Agent({  
          rejectUnauthorized: false // Bypass SSL certificate validation (use with caution in production)
        });

        const response = await axios.get(apiUrl, { httpsAgent: agent });
        const result: ApiResponse = response.data; // Update to use axios response
        setNews(result.data); // Update to use data property from response
      } catch (error) {
        console.error('Error fetching news:', error);
        alert(`Failed to fetch news: ${(error as Error).message}`); // Notify user of the error
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [category]);

  return (
    <NewsContext.Provider value={{ news, category, setCategory, loading, newsItem, setNewsItem }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const context = useContext(NewsContext);
  if (undefined === context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
}
