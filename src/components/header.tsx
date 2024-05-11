import React from 'react';
import Header_left from './header left';
import Header_center from './header_center';
import Header_right from './header_right';
import styles from "../styles/header.module.css";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className={styles.header}>
    <Header_left title={''}>
        
    </Header_left>   
    <Header_center title={''}>
        
    </Header_center> 
    <Header_right navLinks={[]}>
        
    </Header_right> 
  </div>
  );
};

export default Header;