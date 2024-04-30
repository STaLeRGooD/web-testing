// components/Layout.tsx
import React, { ReactNode } from 'react';
import Col_Right from './col_right';
import Col_Center from './col_center';
import Col_left from './col_left';
import styles from "../../styles/main.module.css";

interface MainProps {
    children: ReactNode;
  }

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <div className={styles.main}>
     <Col_left title={''}></Col_left>     
     <Col_Center title={''}></Col_Center> 
     <Col_Right title={''}></Col_Right>   
    </div>
  );
};

export default Main;
