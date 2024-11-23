import React from 'react';
import styles from './styles/topLayout.module.css';
import TopStories from './TopStories';
import BreakingNewsSlider from './shared/breakingnewsslider';

const TopLayout: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.flexItem1}>
        <BreakingNewsSlider/>
      </div>
      <div className={styles.flexItem2}>
        <TopStories numberOfStories={2} showSeeMore={false} />
      </div>
    </div>
  );
};

export default TopLayout;
