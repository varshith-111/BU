'use client';

import Link from "next/link";
import styles from "./styles/newslist.module.css";
import Image from "next/image";
import { FiEye, FiClock } from 'react-icons/fi';
import { useNews } from '../context/NewsContext';

export default function NewsList() {
  const { news, loading } = useNews();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className={styles.newsList}>
      {news.map((item) => (
        <Link
          key={item.id}
          href={`/article/${item.id}/${encodeURIComponent(item.title.replace(/ /g, '-'))}`}
          className={styles.newsItem}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={item.imageUrl[0]}
              alt={`News Image for ${item.title}`}
              width={100}
              height={100}
              style={{ objectFit: 'cover' }}
              className={styles.image}
            />
          </div>
          <div className={styles.newsContent}>
            <h3 className={styles.title}>{item.title}</h3>
            <div className={styles.meta}>
              <span className={styles.timeAgo}>
                <FiClock className={styles.icon} /> {item.publishedOn}
              </span>
              {/* <span className={styles.views}>
                <FiEye className={styles.icon} /> {item.views.toLocaleString()}
              </span> */}
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
