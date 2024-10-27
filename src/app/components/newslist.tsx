import Link from "next/link";
import styles from "./styles/newslist.module.css";
import Image from "next/image";

// Define a type for our news item
type NewsItem = {
  id: number;
  imageUrl: string;
  title: string;
  timeAgo: string;
  views: number;
};

// Create an array of news items
const newsItems: NewsItem[] = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/id/770/98/69",
    title: "Ronaldo matches all-time record and inspires Portugal",
    timeAgo: "2 hours ago",
    views: 3700,
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/id/773/98/69",
    title: "New breakthrough in renewable energy technology",
    timeAgo: "4 hours ago",
    views: 2500,
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/id/45/98/69",
    title: "Global summit addresses climate change challenges",
    timeAgo: "6 hours ago",
    views: 1800,
  },
  {
    id: 4,
    imageUrl: "https://picsum.photos/id/773/98/69",
    title: "Tech giant unveils revolutionary AI-powered device",
    timeAgo: "8 hours ago",
    views: 5200,
  },
  {
    id: 1,
    imageUrl: "https://picsum.photos/id/770/98/69",
    title: "Ronaldo matches all-time record and inspires Portugal",
    timeAgo: "2 hours ago",
    views: 3700,
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/id/2/98/69",
    title: "New breakthrough in renewable energy technology",
    timeAgo: "4 hours ago",
    views: 2500,
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/id/54/98/69",
    title: "Global summit addresses climate change challenges",
    timeAgo: "6 hours ago",
    views: 1800,
  },
  {
    id: 4,
    imageUrl: "https://picsum.photos/id/5/98/69",
    title: "Tech giant unveils revolutionary AI-powered device",
    timeAgo: "8 hours ago",
    views: 5200,
  },
  {
    id: 5,
    imageUrl: "https://picsum.photos/id/770/98/69",
    title: "Ronaldo matches all-time record and inspires Portugal",
    timeAgo: "2 hours ago",
    views: 3700,
  },
  {
    id: 6,
    imageUrl: "https://picsum.photos/id/477/98/69",
    title: "New breakthrough in renewable energy technology",
    timeAgo: "4 hours ago",
    views: 2500,
  },
  {
    id: 7,
    imageUrl: "https://picsum.photos/id/44/98/69",
    title: "Global summit addresses climate change challenges",
    timeAgo: "6 hours ago",
    views: 1800,
  },
  {
    id: 8,
    imageUrl: "https://picsum.photos/id/487/98/69",
    title: "Tech giant unveils revolutionary AI-powered device",
    timeAgo: "8 hours ago",
    views: 5200,
  },
  {
    id: 9,
    imageUrl: "https://picsum.photos/id/887/98/69",
    title: "Ronaldo matches all-time record and inspires Portugal",
    timeAgo: "2 hours ago",
    views: 3700,
  },
  {
    id: 10,
    imageUrl: "https://picsum.photos/id/21/98/69",
    title: "New breakthrough in renewable energy technology",
    timeAgo: "4 hours ago",
    views: 2500,
  },
  {
    id: 11,
    imageUrl: "https://picsum.photos/id/84/98/69",
    title: "Global summit addresses climate change challenges",
    timeAgo: "6 hours ago",
    views: 1800,
  },
  {
    id: 12,
    imageUrl: "https://picsum.photos/id/41/98/69",
    title: "Tech giant unveils revolutionary AI-powered device",
    timeAgo: "8 hours ago",
    views: 5200,
  },
];

export default function NewsList() {
  return (
    <section className={styles.newsList}>
      {newsItems.map((item) => (
        <Link
          key={item.id}
          href={`/article/${item.id}/${encodeURIComponent(item.title)}`}
          className={styles.newsItem}
        >
          <Image
            src={item.imageUrl}
            alt={`News Image for ${item.title}`}
            width={98}
            height={69}
          />
          <div className={styles.newsContent}>
            <h3>{item.title}</h3>
            <p>
              {item.timeAgo} • {item.views.toLocaleString()} views
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}