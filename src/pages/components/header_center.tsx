import React from 'react';
import styles from "../../styles/header.module.css";

interface HeaderProps {
  title: string;
}

const Header_center: React.FC<HeaderProps> = ({ title }) => {
  return (
  <div className={styles.header_center}>
  </div>
  );
};

export default Header_center;