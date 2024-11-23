import Image from "next/image";
import Link from "next/link";
import styles from "../styles/articleCard.module.css";
import { NewsItem } from "@/app/types/newsItem";


export default function CategoryNewsCard({ newsItem }: { newsItem: NewsItem }) {
  return (
    <Link href={`/article/${newsItem.id}/${newsItem.category}/${encodeURIComponent(newsItem.title.replace(/ /g, '-'))}`} className={styles.card}>
      {newsItem.imageUrl && newsItem.imageUrl.length > 0 && (
        <div className={styles.imageWrapper}>
          <Image
            src={newsItem.imageUrl[0]}
            alt={`Image for ${newsItem.title}`}
            width={100}
            height={100}
            style={{ objectFit: 'cover' }}
            className={styles.image}
          />
        </div>
      )}

      <div className={styles.content}>
        <h3 className={styles.title}>{newsItem.title}</h3>
      </div>
    </Link>
  );
} 