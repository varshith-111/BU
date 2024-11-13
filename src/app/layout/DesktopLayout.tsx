'use client';

import React from 'react';
import styles from '../components/styles/layouts.module.css'

const DesktopLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.desktopLayout}>
      {children}
    </div>
  );
};

export default DesktopLayout; 