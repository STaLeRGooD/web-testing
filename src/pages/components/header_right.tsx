import React from 'react';
import styles from "../../styles/header.module.css";
import Image from 'next/image'

interface HeaderProps {
  title: string;
}

const Header_right: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className={styles.header_right}>
    <nav className={styles.nav}>
        <ul className={styles.ul}>
            <li className={styles.li}><a className={styles.a} href="#">Profile</a></li>
            <li className={styles.li}><a className={styles.a} href="#">Profile</a></li>
            <li className={styles.li}><a><Image src="/img/emt.png" className={styles.header_pic} alt="Profile" width={20} height={20}/></a></li>
        </ul>
    </nav>
    </div>
  );
};

export default Header_right;