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
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  return new Promise((resolve, reject) => {
    const req = request(`${baseUrl}/Articles/GetbyId/${id}`, { agent }, (res) => {
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

const checkArticleViews = async (id: string): Promise<number | null> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  return new Promise((resolve, reject) => {
    const req = request(`${baseUrl}/Articles/checkViews/${id}`, { agent }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const jsonData = JSON.parse(data);
        resolve(jsonData.views || null); // Assuming the response contains a 'views' field
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
};

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  if (!Array.isArray(params.slug) || params.slug.length === 0) {
    notFound();
  }

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
      images: Array.isArray(article.imageUrl) && article.imageUrl.length > 0 ? [article.imageUrl[0]] : [''],
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string[] } }) {
  if (!Array.isArray(params.slug) || params.slug.length === 0) {
    notFound();
  }

  const id = params.slug[0];
  const article = await fetchArticleById(id);

  if (!article) {
    notFound();
  }
  await checkArticleViews(id)

  return (
    <>
      <NewsCard article={article} />
    </>
  );
}
