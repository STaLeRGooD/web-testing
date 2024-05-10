import React from 'react';
import styles from "../styles/header.module.css";

interface HeaderProps {
  title: string;
}

const Header_left: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className={styles.header_left}>
    <nav className={styles.nav}>
        <ul className={styles.ul}>
            <li className={styles.li}><a className={styles.a} href="#">Home</a></li>
            <li className={styles.li}><a className={styles.a} href="#">About</a></li>
            <li className={styles.li}><a className={styles.a} href="#">Services</a></li>
            <li className={styles.li}><a className={styles.a} href="#">Contact</a></li>
        </ul>
    </nav>
    </div>
  );
};

export default Header_left;