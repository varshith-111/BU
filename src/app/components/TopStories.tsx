"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles/topStories.module.css"; // Ensure this CSS file exists
import Link from "next/link";
import { NewsItem } from "../types/newsItem";
import Skeleton from 'react-loading-skeleton'; // Import the skeleton loader

const TopStories = ({ numberOfStories = 3, showSeeMore = true }) => {
  const [stories, setStories] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopStories = async () => {
      setLoading(true);
      try {
        const baseUrl = `https://paltinumnewsapi-ayfheaamcefrgvg5.canadacentral-01.azurewebsites.net/`;
        const response = await axios.get(`${baseUrl}/api/Articles/GetAll`);
        setStories(response.data.data.slice(0, numberOfStories));
      } catch (error) {
        console.error("Error fetching top stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopStories();
  }, [numberOfStories]);

  if (loading) {
    return (
      <>
        <div className={styles.skeletonContainer}>
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonDescription} />
        </div>
        <div className={styles.skeletonContainer}>
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonDescription} />
        </div>
      </>
    );
  }

  return (
    <div className={styles.topStoriesContainer}>
      <h3>Top Stories</h3>
      <div className={styles.separator}></div>
      {stories.map((story) => (
        <div key={story.id} className={styles.storyItem}>
          <Link href={`/article/${story.id}/${story.category}/${encodeURIComponent(story.title.replace(/ /g, '-'))}`}>
            <h4 className={styles.title}>{story.title}</h4>
            <p className={styles.description}>{story.title}</p>
            {/* <span className={styles.publishedOn}>{story.publishedOn}</span> */}
          </Link>
        </div>
      ))}
      {showSeeMore && (
        <Link href="/" className={styles.seeMore}>See more</Link>
      )}
    </div>
  );
};

export default TopStories; 