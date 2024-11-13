// 'use client';

import styles from "./styles/newslist.module.css";
// import { FiClock } from 'react-icons/fi';
import { NewsItem } from "../types/newsItem";
import ArticleCard from "./ArticleCard";


export default function NewsList({ news }: { news: NewsItem[] }) {
  if (!news || news.length === 0) {
    return <div>No news available.</div>;
  }

  return (
    <section className={styles.newsList}>
      {news.map((item) => (
        <ArticleCard key={item.id} newsItem={item} />
      ))}
    </section>
  );
}