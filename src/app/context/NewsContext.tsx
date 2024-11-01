'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Update the NewsItem type to match the API response
type NewsItem = {
  id: string;
  imageUrl: string[];  // Changed to string array
  title: string;
  category: string;
  description: string;
  header: string;
  publishedOn: string;
  publishedBy: string;
};

// Add API response type
type ApiResponse = {
  data: NewsItem[];
  status: boolean;
  message: string;
  responceCode: string;
};

type NewsContextType = {
  news: NewsItem[];
  category: string;
  setCategory: (category: string) => void;
  loading: boolean;
};

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export function NewsProvider({ children }: { children: ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [category, setCategory] = useState('Sports');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        const response = await fetch(`http://20.205.138.193/api/Articles/GetAll`);
        const result: ApiResponse = await response.json();
        setNews(result.data); // Update to use data property from response
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [category]);

  return (
    <NewsContext.Provider value={{ news, category, setCategory, loading }}>
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
