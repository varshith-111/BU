import React from 'react';
import styles from '../../styles/threeHundTwoFifty.module.css';
import Image from 'next/image';

const ThreeHundTwoFifty: React.FC = () => {
  return (
    <div className={styles.threehundTwofifty}>
      <Image 
        src="/ad.svg"  // Corrected path, remove "public/"
        alt="Ad"
        width={300}     // Specify width
        height={250}    // Specify height
      />
    </div>
  );
};

export default ThreeHundTwoFifty;
