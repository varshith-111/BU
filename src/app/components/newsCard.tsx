import Image from "next/image";
import styles from "./styles/newsCard.module.css";
import { IoShareSocial } from "react-icons/io5";

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
  };
}

const NewsCard = ({ article }: NewsCardProps) => {
  return (
    <article className={styles.container}>
      <h1 className={styles['article-title']}>
        {article.title}
      </h1>
      
      <div className={styles['author-info']}>
        <Image
          src="https://picsum.photos/id/64/96/96" // You might want to add author avatar to your data model
          alt={article.publishedBy}
          className={styles['author-avatar']}
          width={48}
          height={48}
        />
        <div className={styles['author-details']}>
          <span className={styles['author-name']}>{article.publishedBy}</span>
          <span className={styles['article-details']}>{article.publishedOn} • 10 Mins read</span>
        </div>
        <IoShareSocial className={styles.shareIcon} />
      </div>
      
      {Array.isArray(article.imageUrl) && article.imageUrl.length > 0 && (
        <Image
          src={article.imageUrl[0]} // Using the first image from the array
          alt={article.title}
          className={styles['main-image']}
          width={800}
          height={400}
        />
      )}
      
      <div className={styles['content-text']}>
        <p>{article.header}</p>
        <p>{article.description}</p>
      </div>
    </article>
  );
}

export default NewsCard;
