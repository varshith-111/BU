'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './styles/breakingnewsslider.css';

const breakingNews = [
  {
    id: 1,
    image: "https://picsum.photos/id/847/250/150",
    title: "Breaking News",
    content: "\"We Have a Deal\": Biden Agrees to Bipartisan Infrastructure Deal",
    time: "2 hours ago",
    author: "Jonathan Weisman"
  },
  {
    id: 2,
    image: "https://picsum.photos/id/84/250/150",
    title: "Technology",
    content: "Apple Announces New M2 Chip for Next-Gen Macs",
    time: "4 hours ago",
    author: "Mark Gurman"
  },
  {
    id: 3,
    image: "https://picsum.photos/id/21/250/150",
    title: "Sports",
    content: "Lionel Messi Leads Argentina to Copa America Victory",
    time: "6 hours ago",
    author: "Rory Smith"
  },
  {
    id: 4,
    image: "https://picsum.photos/id/744/200/150",
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

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + breakingNews.length) % breakingNews.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % breakingNews.length);
  };

  return (
    <section className="breaking-news-slider">
      <div className="slider-container">
        {breakingNews.map((news, index) => (
          <div
            key={news.id}
            className={`breaking-news-item ${index === currentSlide ? 'active' : ''}`}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            <Image
              src={news.image}
              alt={news.title}
              layout="fill"
              objectFit="cover"
            />
            <div className="news-overlay">
              <div className="news-category">{news.title}</div>
              <h2>{news.content}</h2>
              <div className="news-meta">
                <span>{news.time}</span>
                <span>By {news.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="nav-button prev" onClick={handlePrevSlide}>
        <FaChevronLeft />
      </button>
      <button className="nav-button next" onClick={handleNextSlide}>
        <FaChevronRight />
      </button>
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