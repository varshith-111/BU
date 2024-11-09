import NewsCard from '@/app/components/newsCard';
import { notFound } from 'next/navigation';

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

const fetchArticleById = async (id: string): Promise<Article | null> => {
  const res = await fetch(`http://20.205.138.193/api/Articles/GetbyId/${id}`);
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data.data || null;
};

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const id = params.slug[0];
  const article = await fetchArticleById(id);

  if (!article) {
    notFound();
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [article.imageUrl[0] || ''],
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string[] } }) {
  const id = params.slug[0];
  const article = await fetchArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <NewsCard article={article} />
    </main>
  );
}
