import Image from "next/image";
import styles from "./styles/newsCard.module.css";
import { IoShareSocial } from "react-icons/io5";

const NewsCard = () => {
  return (
    <article className={styles.container}>
      <h1 className={styles['article-title']}>
        Some examples of computer setups that suit your style: Minimalist with a modern touch
      </h1>
      
      <div className={styles['author-info']}>
        <Image
          src="https://picsum.photos/id/64/96/96"
          alt="Eren Yaeger"
          className={styles['author-avatar']}
          width={48}
          height={48}
        />
        <div className={styles['author-details']}>
          <span className={styles['author-name']}>Eren Yaeger</span>
          <span className={styles['article-details']}>Nov 21, 2023 • 10 Mins read</span>
        </div>
        <IoShareSocial className={styles.shareIcon} />
      </div>
      
      <Image
        src="https://picsum.photos/id/741/800/400"
        alt="Modern computer setup"
        className={styles['main-image']}
        width={800}
        height={400}
      />
      
      <div className={styles['content-text']}>
        <p>
          So you've got a new computer. Awesome! That humble metal box is the key to a wide world of potential. It can
          handle everything, from juggling your work and family to blowing off some steam on, uh, Steam.
        </p>
        <p>
          But a new PC isn't like a new car; you can't just turn a key and put the pedal to the metal. Here are some
          tips to create a minimalist yet modern computer setup that suits your style...
        </p>
      </div>
    </article>
  );
}

export default NewsCard;
