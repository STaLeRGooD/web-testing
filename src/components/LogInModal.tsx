'use client'

import { useState } from 'react';
import styles from "../styles/signin.module.css";

import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import type { FormEventHandler } from "react";
import { addRedis} from '@/src/app/actions/redis_add'
import { getRedis } from '@/src/app/actions/redis_get'
import { Session } from 'inspector';
import { useSession, signOut } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authConfig } from '../configs/auth';


interface LogInModalProps {
  onClose: () => void;
}

const LogInModal: React.FC<LogInModalProps> = ({ onClose }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const session = useSession();

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    //--------redis
    //const user_data = res 
    //const result = await addRedis(status)
    // Ваша логика авторизации здесь
    if (res && !res.error) {
      router.push("/");
    } else {
      console.log(res);
    }
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
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </label>
          <label className={styles.label}>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  required/>
          </label>
          <button className={styles.button} type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LogInModal;
