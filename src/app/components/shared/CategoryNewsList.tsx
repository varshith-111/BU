// 'use client';

import { NewsItem } from "@/app/types/newsItem";
import styles from "../styles/newslist.module.css";
import CategoryNewsCard from "./CategoryNewsCard";
// import { FiClock } from 'react-icons/fi';


export default function CategoryNewsList({ news }: { news: NewsItem[] }) {
  if (!news || news.length === 0) {
    return <div>No news available.</div>;
  }

  return (
    <section className={styles.newsList}>
      {news.map((item) => (
        <CategoryNewsCard key={item.id} newsItem={item} />
      ))}
    </section>
  );
}