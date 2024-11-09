import NewsCard from '@/app/components/newsCard';
import { notFound } from 'next/navigation';
import https from 'https';
import { request } from 'https';

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

const agent = new https.Agent({
  rejectUnauthorized: false // Disable SSL verification
});

const fetchArticleById = async (id: string): Promise<Article | null> => {
  const baseUrl = 'https://20.205.138.193';
  
  return new Promise((resolve, reject) => {
    const req = request(`${baseUrl}/api/Articles/GetbyId/${id}`, { agent }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const jsonData = JSON.parse(data);
        resolve(jsonData.data || null);
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
};

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  // Check if params.slug is an array and has at least one element
  if (!Array.isArray(params.slug) || params.slug.length === 0) {
    notFound(); // Handle the case where slug is not valid
  }
  
  const id = params.slug[0]; // No need for await here
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
  const id = await params.slug[0];
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
