import React, { useState } from 'react';

import styles from "../../styles/header.module.css";
import Image from 'next/image'
import RegisterModal from '../components/RegisterModal';
import LogInModal from '../components/LogInModal';



interface HeaderProps {
  title: string;
}

const Header_right: React.FC<HeaderProps> = ({ title }) => {
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const toggleRegModal = () => {
    setIsRegModalOpen(!isRegModalOpen);
  };
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const toggleLogModal = () => {
    setIsLogModalOpen(!isLogModalOpen);
  };
  return (
    <div className={styles.header_right}>
    <nav className={styles.nav}>
        <ul className={styles.ul}>
            <li className={styles.li}><a className={styles.a} href="#"><button onClick={toggleLogModal}>Log In</button>{isLogModalOpen && <LogInModal onClose={toggleLogModal} />}</a></li>
            
            <li className={styles.li}><a className={styles.a} href="#"><button onClick={toggleRegModal}>Sign up</button>{isRegModalOpen && <RegisterModal onClose={toggleRegModal} />}</a></li>
            <li className={styles.li}><a className={styles.a} href="#"><Image src="/img/emt.png" className={styles.header_pic} alt="Profile" width={20} height={20}/></a></li>
            
        </ul>
    </nav>
    </div>
    
  );
};

export default Header_right;