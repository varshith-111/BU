// 'use client';

import Link from "next/link";
import styles from "./styles/newslist.module.css";
import Image from "next/image";
// import { FiClock } from 'react-icons/fi';
import { NewsItem } from "../types/newsItem";


export default function NewsList({ news }: { news: NewsItem[] }) {
  if (!news || news.length === 0) {
    return <div>No news available.</div>;
  }

  return (
    <section className={styles.newsList}>
      {news.map((item) => (
        <Link
          key={item.id}
          href={`/article/${item.id}/${item.category}/${encodeURIComponent(item.title.replace(/ /g, '-'))}`}
          className={styles.newsItem}
        >
          <div className={styles.imageWrapper}>
            {Array.isArray(item.imageUrl) && item.imageUrl.length > 0 && (
              <Image
                src={item.imageUrl[0]}
                alt={`News Image for ${item.title}`}
                width={100}
                height={100}
                style={{ objectFit: 'cover' }}
                className={styles.image}
                priority={false}
              />
            )}
          </div>
          <div className={styles.newsContent}>
            <h3 className={styles.title}>{item.title}</h3>
            {/* <div className={styles.meta}>
              <span className={styles.timeAgo}>
                <FiClock className={styles.icon} /> {item.publishedOn}
              </span>
            </div> */}
          </div>
        </Link>
      ))}
    </section>
  );
}