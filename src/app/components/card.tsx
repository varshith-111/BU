import Image from 'next/image';
import Link from 'next/link';
import styles from './styles/card.module.css';
import { NewsItem } from '../types/newsItem';

interface CardProps {
  article: NewsItem;
}

const Card: React.FC<CardProps> = ({ article }) => {
  return (
    <Link href={`/article/${article.id}/${article.category}/${encodeURIComponent(article.title.replace(/ /g, '-'))}`} className={styles.article}>
      <Image
        src={article.imageUrl[0]}
        alt={article.title}
        width={100}
        height={69}
        className={styles.articleImage}
      />
      <div className={styles.articleContent}>
        <h3 className={styles.articleTitle}>{article.title}</h3>
        {/* <span className={styles.articleTime}>[{article.publishedOn}]</span> */}
      </div>
    </Link>
  );
};

export default Card;