// components/RegisterModal.tsx

import { useState } from 'react';
import styles from "../../styles/signup.module.css";

interface RegisterModalProps {
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ваша логика регистрации здесь
    console.log('Registration logic');
    // Закрыть модальное окно после регистрации
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Registration Form</h2>
        <form className={styles.form} onSubmit={handleRegister}>
          <label className={styles.label}>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label className={styles.label} >
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className={styles.label}>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button className={styles.button} type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
