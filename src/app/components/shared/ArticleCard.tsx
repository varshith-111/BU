import Image from 'next/image';

const ArticleCard = () => {
  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <Image
          src="https://platinumimagestorage.blob.core.windows.net/imagecontainer/674205f8511a692d870ce477/20241123164236120_bike royal.jpg"
          alt="Keyboard shortcuts"
          style={{
            objectFit: 'cover',
          }}
          fill // Makes the image responsive to its container
        />
      </div>
      <div style={styles.cardText}>
        <h3 style={styles.title}>16 essential keyboard shortcuts everyone should know</h3>
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
    margin: '4px',
    border: '1px solid #e0e0e0'
  },
  imageContainer: {
    position: 'relative', // Ensures the container works with the `fill` prop
   // width: '100%',
    height: '80px',
  },
  cardText: {
    padding: '4px',
  },
  title: {
    fontSize: '15px',
    margin: 0,
    lineHeight: 1.2,
  },
};

export default ArticleCard;
