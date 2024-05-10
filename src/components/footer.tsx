import React from 'react';
import styles from "../styles/footer.module.css";

interface FooterProps {
  title: string;
}

const Footer: React.FC<FooterProps> = ({ }) => {
  return (
    <div className={styles.footer}>
    <p className={styles.p}>&copy; 2024 MyWebsite. All rights reserved.</p>
    </div>
  );
};

export default Footer;