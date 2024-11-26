import { NewsItem } from '@/app/types/newsItem';
import Image from 'next/image';

const ArticleCard = ({ newsItem }: { newsItem: NewsItem }) => {
  return (
    <div style={styles.card}>
      {newsItem.imageUrl && newsItem.imageUrl.length > 0 && (
        <div style={styles.imageWrapper}>
          <Image
            src={newsItem.imageUrl[0]}
            alt={`Image for ${newsItem.title}`}
            width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}
          />
        </div>
      )}
      <div style={styles.cardText}>
        <h3 style={styles.title}>{newsItem.header}</h3>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: 'white',
    borderRadius: '0px',
    overflow: 'hidden',
    color: 'black',
    display: 'inline-block',
    maxWidth: '300px',
    // margin: '4px',
    border: '1px solid #e0e0e0'
  },
  imageContainer: {
    position: 'relative', // Ensures the container works with the `fill` prop
    // width: '100%',
    height: '80px',
  },
  cardText: {
    padding: '8px 4px',
  },
  title: {
    fontSize: '15px',
    margin: 0,
    lineHeight: 1.2,
  },
};

export default ArticleCard;
