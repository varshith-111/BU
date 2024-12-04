import React from "react";
import styles from "../styles/footerd.module.css"; // Import the CSS module

const FooterD = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="#" className={styles.link}>TERMS & CONDITIONS</a> |
        <a href="#" className={styles.link}>PRIVACY POLICY</a> |
        <a href="#" className={styles.link}>CSR POLICY</a> |
        <a href="#" className={styles.link}>ANNUAL RETURN</a> |
        <a href="#" className={styles.link}>TARIFF</a> |
        <a href="#" className={styles.link}>FEEDBACK</a> |
        <a href="#" className={styles.link}>CONTACT US</a> |
        <a href="#" className={styles.link}>ABOUT US</a>
      </div>
      <div className={styles.copyright}>
        <p>Powered By Margadarsi Computers</p>
      </div>
    </footer>
  );
};

export default FooterD;
