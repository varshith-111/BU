'use client';
import { useState } from 'react';
import { IoHomeOutline, IoHome, IoBonfireOutline, IoLogoFirebase } from 'react-icons/io5';
import styles from '../styles/footer.module.css';

export default function Footer() {
  const [activeTab, setActiveTab] = useState('home');

  const handleHomeClick = () => {
    setActiveTab('home');
    window.location.href = '?category=ALL'
   // window.location.reload();
  };

  return (
    <footer className={styles.footernav}>
      <nav className={styles.bottomNav}>
        <button 
          onClick={handleHomeClick} 
          className={activeTab === 'home' ? styles.active : ''}
        >
          {activeTab === 'home' ? <IoHome /> : <IoHomeOutline />}
          <span>Home</span>
        </button>
        {/* <button 
          onClick={() => setActiveTab('search')} 
          className={activeTab === 'search' ? styles.active : ''}
        >
          {activeTab === 'search' ? <IoSearch /> : <IoSearchOutline />}
          <span>Search</span>
        </button> */}
        <button 
           onClick={handleHomeClick} 
          className={activeTab === 'trending' ? styles.active : ''}
        >
          {activeTab === 'trending' ? (
            <>
              <IoLogoFirebase />
            </>
          ) : (
            <>
              <IoBonfireOutline />
            </>
          )}
          <span>Trending</span>
        </button>
      </nav>
    </footer>
  );
}
