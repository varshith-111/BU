'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import './styles/breakingnewsslider.css';

const breakingNews = [
  {
    id: 1,
    image: "https://picsum.photos/id/741/300/150",
    title: "Breaking News",
    content: "\"We Have a Deal\": Biden Agrees to Bipartisan Infrastructure Deal",
    time: "2 hours ago",
    author: "Jonathan Weisman"
  },
  {
    id: 2,
    image: "https://picsum.photos/id/742/300/150",
    title: "Technology",
    content: "Apple Announces New M2 Chip for Next-Gen Macs",
    time: "4 hours ago",
    author: "Mark Gurman"
  },
  {
    id: 3,
    image: "https://picsum.photos/id/743/300/150",
    title: "Sports",
    content: "Lionel Messi Leads Argentina to Copa America Victory",
    time: "6 hours ago",
    author: "Rory Smith"
  },
  {
    id: 4,
    image: "https://picsum.photos/id/744/300/150",
    title: "Science",
    content: "NASA's Perseverance Rover Discovers Ancient Organic Matter on Mars",
    time: "8 hours ago",
    author: "Kenneth Chang"
  }
];

export default function BreakingNewsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % breakingNews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="breaking-news-slider">
      {breakingNews.map((news, index) => (
        <div
          key={news.id}
          className={`breaking-news-item ${index === currentSlide ? 'active' : ''}`}
        >
          <Image
            src={news.image}
            alt={news.title}
            width={300}
            height={150}
          />
          <div className="breaking-news-content">
            <h2>{news.title}</h2>
            <p>{news.content}</p>
            <span>{news.time}</span><br />
            <span>By {news.author}</span>
          </div>
        </div>
      ))}
      <div className="slider-dots">
        {breakingNews.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}