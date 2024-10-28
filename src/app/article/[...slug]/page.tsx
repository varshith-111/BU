'use client';

import NewsCard from '@/app/components/newsCard';
import { useNews } from '@/app/context/NewsContext';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

// Update interface to match NewsItem type from context
interface Article {
  id: string;
  imageUrl: string[];
  title: string;
  category: string;
  description: string;
  header: string;
  publishedOn: string;
  publishedBy: string;
}

export default function ArticlePage({ params }: { params: { slug: string[] } }) {
  const { news } = useNews();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);  // Add loading state
  
  // Extract the ID from the first segment of the slug
  const id = params.slug[0];

  useEffect(() => {
    if (news.length > 0) {  // Only search when news data is available
      const foundArticle = news.find(item => item.id === id);
      setArticle(foundArticle || null);
    }
    setIsLoading(false);
  }, [id, news]);

  // Show loading state instead of 404
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Only show 404 after we've confirmed the article doesn't exist
  if (!article) {
    notFound();
  }

  return <NewsCard article={article} />;
}
