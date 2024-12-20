"use client";
import Image from "next/image";
import styles from "./styles/newsCard.module.css";
import { IoShareSocial } from "react-icons/io5";
import dynamic from "next/dynamic";
const EmbedRenderer = dynamic(() => import("./shared/EmbedRenderer"), {
  ssr: false,
});

interface NewsCardProps {
  article: {
    id: string;
    imageUrl: string[];
    title: string;
    category: string;
    description: string;
    header: string;
    publishedOn: string;
    publishedBy: string;
    xEmbed?: string;
  };
}

const NewsCard = ({ article }: NewsCardProps) => {
  return (
    <article className={styles.container}>
      <h1 className={styles["article-title"]}>{article.title}</h1>

      <div className={styles["author-info"]}>
        {/* <Image
          src="https://picsum.photos/id/64/96/96"
          alt={article.publishedBy}
          className={styles['author-avatar']}
          width={48}
          height={48}
        /> */}
        <div className={styles["author-details"]}>
          {/* <span className={styles['author-name']}>{article.publishedBy}</span> */}
          <span className={styles["article-details"]}>
            Published{" "}
            {new Date(article.publishedOn)
              .toLocaleString("en-US", {
                weekday: "short", // Day of the week (e.g., Mon)
                month: "short", // Month abbreviated (e.g., Dec)
                day: "numeric", // Day of the month (e.g., 05)
                year: "numeric", // Full year (e.g., 2024)
                hour: "numeric", // Hour (e.g., 10 AM)
                minute: "numeric", // Minute (e.g., 5)
                hour12: true, // 12-hour format
              })
              .replace(",", "")}{" "}
            • 1 Mins read
          </span>
        </div>
        <IoShareSocial className={styles.shareIcon} />
      </div>

      {Array.isArray(article.imageUrl) && article.imageUrl.length > 0 && (
        <Image
          src={article.imageUrl[0]}
          alt={article.title}
          className={styles["main-image"]}
          width={800}
          height={400}
        />
      )}

      <div className={styles["content-text"]}>
        <div dangerouslySetInnerHTML={{ __html: article.description }}></div>
      </div>

      {/* Conditionally render EmbedRenderer if xEmbed exists */}
      {article.xEmbed && <EmbedRenderer embedHtml={article.xEmbed} />}
    </article>
  );
};

export default NewsCard;
