'use client';

import Link from "next/link";
import styles from "./styles/newslist.module.css";
import Image from "next/image";
import { FiEye, FiClock } from 'react-icons/fi';
import { useNews } from '../context/NewsContext';

const NewsListSkeleton = () => (
  <div className={styles.newsList}>
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className={`${styles.newsItem} ${styles.skeleton}`}>
        <div className={`${styles.imageWrapper} ${styles.skeletonImage}`} />
        <div className={styles.newsContent}>
          <div className={`${styles.skeletonTitle} ${styles.skeletonAnimation}`} />
          <div className={styles.meta}>
            <div className={`${styles.skeletonMeta} ${styles.skeletonAnimation}`} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default function NewsList() {
  const { news, loading } = useNews();

  if (loading) {
    return <NewsListSkeleton />;
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
              src={item.imageUrl && item.imageUrl.length > 0 ? item.imageUrl[0] : '/default-image.jpg'}
              alt={`News Image for ${item.title}`}
              width={100}
              height={100}
              style={{ objectFit: 'cover' }}
              className={styles.image}
              priority={false}
            />
          </div>
          <div className={styles.newsContent}>
            <h3 className={styles.title}>{item.title}</h3>
            <div className={styles.meta}>
              <span className={styles.timeAgo}>
                <FiClock className={styles.icon} /> {item.publishedOn}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
