import React from 'react';
import styles from "../../styles/main.module.css";

interface Col_Props {
  title: string;
} 

const Col_Right: React.FC<Col_Props> = ({ title }) => {
  return (
    <div className={styles.col_right}>
       <h2>Section</h2>
    </div>
  );
};

export default Col_Right;