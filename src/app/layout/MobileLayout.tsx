'use client';

import React from 'react';
import styles from '../components/styles/layouts.module.css';

const MobileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.mobileLayout}>
      {children}
    </div>
  );
};

export default MobileLayout; 