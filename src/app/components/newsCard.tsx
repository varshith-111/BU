import Image from "next/image";
import styles from "./styles/newsCard.module.css";
import { IoArrowBack, IoShareSocial } from "react-icons/io5";

const NewsCard = () =>  {
  return (
    <div className={styles.container}>
      <div className={styles['article-title']}>
        Some examples of computer set up that suits your styles. Minimalist with modern touch
      </div>
      {/* Author info and share icon */}
      <div className={styles['author-info']}>
        <span className={styles['author-name']}>Eren Yaeger</span>
        <IoShareSocial className={styles.shareIcon} />
      </div>
         {/* Article details (date, time) */}
         <div className={styles['article-details']}>Nov 21, 2023 • 10 Mins read</div>
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
