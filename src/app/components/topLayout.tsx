import React from 'react';
import styles from './styles/topLayout.module.css';
import BreakingNewsSlider from './breakingnewsslider';
import PhotographyCard from './PhotographyCard';

const TopLayout: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.flexItem1}>
        <BreakingNewsSlider/>
      </div>
      <div className={styles.flexItem2}>
      <PhotographyCard/>
      </div>
    </div>
  );
};

export default TopLayout;
