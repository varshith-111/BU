import Image from "next/image";
import styles from "./styles/newsCard.module.css";
const NewsCard = () =>  {
  return (
    <div className={styles.container}>
      {/* Top bar with icons */}
      <div className={styles['top-bar']}>
        <span className={styles.icon}>⋯</span>
      </div>
      {/* Article details (date, time, title) */}
      <div className={styles['article-details']}>Nov 21, 2023 • 10 Mins read</div>
      <div className={styles['article-title']}>
        Some examples of computer set up that suits your styles. Minimalist with modern touch
      </div>
      {/* Author and tag info */}
      <div className={styles['author-info']}>
        <span className={styles['author-name']}>Eren Yaeger</span>
      </div>
      {/* Main image of the content */}
      <Image
        src="https://picsum.photos/id/741/300/150"
        alt="Breaking News"
        className={styles['main-image']}
        width={300}
        height={150}
      />
      {/* Content text */}
      <div className={styles['content-text']}>
        So you’ve got a new computer. Awesome! That humble metal box is the key to a wide world of potential. It can
        handle everything, from juggling your work and family to blowing off some steam on, uh, Steam.
        <br />
        <br />
        But a new PC isn’t like a new car; you can’t just turn a key and put the pedal to the metal...
      </div>
    </div>
  );
}
export default NewsCard;