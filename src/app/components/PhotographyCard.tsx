import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NewsItem } from '../types/newsItem';
import styles from './styles/PhotographyCard.module.css';
import https from 'https';
import Image from 'next/image';

const PhotographyCard: React.FC = () => {
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const baseUrl = `https://thepostnews-aycjeyh6ffbaa5dm.canadacentral-01.azurewebsites.net`;
        const response = await axios.get(`${baseUrl}/api/Articles/GetAll`, {
          httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });
        
        // Assuming the response contains an array of items, display the first one
        setNewsItem(response.data.data[0]);
      } catch (error) {
        console.error('Error fetching breaking news:', error);
      }
    };

    fetchBreakingNews();
  }, []);

  return (
    <div>
      {newsItem && (
        <div className={styles.card}>
          <div className={styles.cardImage}>
            {newsItem.imageUrl?.[0] && (
              <Image src={newsItem.imageUrl[0]} alt="Photography" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
            )}
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{newsItem.title}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotographyCard;
