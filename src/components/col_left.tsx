import React from 'react';
import styles from "../styles/main.module.css";

interface Col_Props {
  title: string;
} 

const Col_left: React.FC<Col_Props> = ({ title }) => {
  return (
    <div className={styles.col_left}>
       <h2>Section</h2>
    </div>
  );
};

export default Col_left;