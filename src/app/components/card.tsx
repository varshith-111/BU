import Image from 'next/image';
import styles from './styles/card.module.css';

interface Article {
  imageUrl: string;
  title: string;
  time: string;
}

interface CardProps {
  article: Article;
}

const Card: React.FC<CardProps> = ({ article }) => {
  return (
    <div className={styles.article}>
      <Image
        src={article.imageUrl}
        alt={article.title}
        width={100}
        height={69}
        className={styles.articleImage}
      />
      <div className={styles.articleContent}>
        <h3 className={styles.articleTitle}>{article.title}</h3>
        {/* <span className={styles.articleTime}>[{article.time}]</span> */}
      </div>
    </div>
  );
};

export default Card;