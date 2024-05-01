import { useState } from 'react';
import styles from "../../styles/signin.module.css";

interface LogInModalProps {
  onClose: () => void;
}

const LogInModal: React.FC<LogInModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ваша логика регистрации здесь
    console.log('Log In logic');
    // Закрыть модальное окно после регистрации
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Log In Form</h2>
        <form className={styles.form} onSubmit={handleLogIn}>
          <label className={styles.label}>
            Email:
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className={styles.label}>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button className={styles.button} type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LogInModal;
