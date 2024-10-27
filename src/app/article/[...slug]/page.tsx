import NewsCard from '@/app/components/newsCard';
import { notFound } from 'next/navigation'

interface Article {
  id: string;
  category: string;
  description: string;
  imageUrl: string;
  publishedOn: string;
  publishedBy: string;
  name: string;
  title: string;
  tweetEmbed: string;
  youtubeUrl: string; 
}

// This is a mock function. Replace it with actual data fetching logic.
async function getArticle(id: string): Promise<Article | null> {
  // Simulating an API call or database query
  const articles: Article[] = [
    {
      id: "1",
      category: "NEWS",
      description: "Generating 4000 lines of dummy text manually would take an excessive amount of time, and even though it’s possible to write, it might be impractical for your purpose. However, here’s a general approach to create it in a simpler, automated way, especially if you plan to use it in programming, such as for generating a file or testing something. Would you like me to provide you with a script (e.g., in Python or JavaScript) that can generate 4000 lines of dummy content quickly? Or would you like some smaller block of text to get started?",
      imageUrl: "https://picsum.photos/id/237/200/100",
      publishedOn: "2024-10-21T18:46:07.936Z",
      publishedBy: "string",
      name: "my name is sravan1",
      title: "This is the full content of article 1...",
      youtubeUrl: 'https://www.youtube.com/watch?v=4RT-yq4pb0E',
      tweetEmbed: '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">BREAKING: Georgia&#39;s GOP Secretary of State publicly debunked my opponent Marjorie Taylor Greene&#39;s claims of Dominion machines switching ballots of people voting for her to my name.<br><br>Please retweet so everyone knows that MTG is petrified of losing and is spreading misinformation. <a href="https://t.co/iMsVdYuGFM">pic.twitter.com/iMsVdYuGFM</a></p>&mdash; Shawn Harris for Congress (@ShawnForGeorgia) <a href="https://twitter.com/ShawnForGeorgia/status/1848180967279673665?ref_src=twsrc%5Etfw">October 21, 2024</a></blockquote>'
    }
  ];

  return articles.find(a => a.id === id) || null;
}

export default async function ArticlePage({ params }: { params: { slug: string[] } }) {
  // Extract the ID from the first segment of the slug
  const id = params.slug[0];
  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  return <NewsCard article={article} />;
}
