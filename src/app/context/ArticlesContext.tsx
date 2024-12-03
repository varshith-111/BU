'use client';
import React, { createContext, useContext, useState } from 'react';
import { NewsItem } from '@/app/types/newsItem';
import { articlesApi } from '@/app/services/api';

interface ArticlesContextType {
  relatedArticles: NewsItem[];
  isLoading: boolean;
  error: Error | null;
  fetchArticles: (category: string, id: string) => Promise<void>;
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(undefined);

export function ArticlesProvider({ children }: { children: React.ReactNode }) {
  const [relatedArticles, setRelatedArticles] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchArticles = async (category: string, id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      let articles = await articlesApi.getByCategory(category);
      
      if (articles.length <= 1) {
        articles = await articlesApi.getAll();
      }
      
      setRelatedArticles(articles.filter((article: NewsItem) => article.id !== id));
    } catch (err) {
      setError(err as Error);
      setRelatedArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ArticlesContext.Provider value={{ relatedArticles, isLoading, error, fetchArticles }}>
      {children}
    </ArticlesContext.Provider>
  );
}

export function useArticles() {
  const context = useContext(ArticlesContext);
  if (context === undefined) {
    throw new Error('useArticles must be used within an ArticlesProvider');
  }
  return context;
} 