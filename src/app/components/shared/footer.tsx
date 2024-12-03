'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoHomeOutline, IoHome, IoSearchOutline, IoSearch, IoPersonOutline, IoPerson, IoTrendingUp, IoTrendingUpOutline, IoBonfireOutline, IoLogoFirebase } from 'react-icons/io5';
import styles from '../styles/footer.module.css';

export default function Footer() {
  const [activeTab, setActiveTab] = useState('home');
  const router = useRouter();

  const handleHomeClick = () => {
    setActiveTab('home');
    router.push('/');
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
