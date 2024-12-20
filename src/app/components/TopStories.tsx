"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./styles/topStories.module.css"; // Ensure this CSS file exists
import Link from "next/link";
import { NewsItem } from "../types/newsItem";
import { articlesApi } from '../services/api'; // Import the articlesApi


const TopStories = ({ numberOfStories = 3, showSeeMore = true }) => {
  const [stories, setStories] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false); // Ref to track if data has been fetched

  useEffect(() => {
    const fetchTopStories = async () => {
      if (hasFetched.current) return; // Prevent multiple calls
      hasFetched.current = true; // Set to true after first call

      setLoading(true);
      try {
        const allStories = await articlesApi.getAll(); // Use articlesApi to fetch stories

        // Set stories based on the number of stories available
        setStories(allStories.slice(0, numberOfStories));
      } catch (error) {
        console.error("Error fetching top stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopStories();
  }, []); // Empty dependency array ensures this runs only once on mount

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