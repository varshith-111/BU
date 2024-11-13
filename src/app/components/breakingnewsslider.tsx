'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './styles/breakingnewsslider.module.css';
import axios from 'axios';
import https from 'https';
import { NewsItem } from '../types/newsItem';
import { useRouter } from 'next/navigation';

export default function BreakingNewsSlider() {
  const [breakingNews, setBreakingNews] = useState<NewsItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const baseUrl = `https://thepostnews-aycjeyh6ffbaa5dm.canadacentral-01.azurewebsites.net/`;
        const response = await axios.get(`${baseUrl}/api/Articles/GetAll`, {
          httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });
        setBreakingNews(response.data.data);
      } catch (error) {
        console.error('Error fetching breaking news:', error);
      }
    };

    fetchBreakingNews();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % breakingNews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [breakingNews]);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + breakingNews.length) % breakingNews.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % breakingNews.length);
  };

  const handleCardClick = (id: string, title: string) => {
    const formattedTitle = encodeURIComponent(title.replace(/ /g, '-'));
    router.push(`/article/${id}/${formattedTitle}`);
  };

  if (breakingNews.length === 0) {
    return null; // Return null or a loading indicator if no data
  }

  return (
    <section className={styles.breakingNewsSlider}>
      <div className={styles.sliderContainer} ref={sliderRef}>
        {breakingNews.map((news: NewsItem, index) => (
          <div
            key={news.id}
            className={`${styles.breakingNewsItem} ${index === currentSlide ? styles.active : ''}`}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            onClick={() => handleCardClick(news.id, news.title)}
          >
            <div className={styles.newsImageContainer}>
              <Image
                src={news.imageUrl && news.imageUrl.length > 0 ? news.imageUrl[0] : '/default-image.jpg'}
                alt={news.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={styles.newsOverlay}>
              <div className={styles.newsCategory}>{news.category}</div>
              <h2>{news.title}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.sliderDots}>
        {breakingNews.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      <button className={`${styles.navButton} ${styles.prev}`} onClick={handlePrevSlide}>
        <FaChevronLeft />
      </button>
      <button className={`${styles.navButton} ${styles.next}`} onClick={handleNextSlide}>
        <FaChevronRight />
      </button>
    </section>
  );
}