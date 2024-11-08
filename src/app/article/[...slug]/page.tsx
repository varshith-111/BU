import NewsCard from '@/app/components/newsCard';
import { notFound } from 'next/navigation';
import Layout from './layout';

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

export default async function ArticlePage({ params }: { params: { slug: string[] } }) {
  const id = params.slug[0];

  let article: Article | null = null;

  if (id) {
    const res = await fetch(`http://20.205.138.193/api/Articles/GetbyId/${id}`);
    const data = await res.json();
    article = data.data || null;  // Set article from API response
  }

  if (!article) {
    notFound();
  }

  return (
    <Layout
      title={article?.title || 'Default Title'}
      description={article?.description || 'Default description'}
      imageUrl={article?.imageUrl[0] || '/default-image.jpg'}
    >
      <NewsCard article={article} />
    </Layout>
  );
}