"use client";

import React, { useState } from 'react';

import styles from "../styles/header.module.css";
import Image from 'next/image'
import RegisterModal from '../components/RegisterModal';
import LogInModal from '../components/LogInModal';
import { redirect, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import {connect} from 'tls';

interface HeaderProps {
  navLinks: NavLink[];
}
type NavLink = {
  label: string;
  href: string;
};

const Header_right: React.FC<HeaderProps> =  ( { navLinks }: HeaderProps) => {
  const pathname = usePathname();
  const session = useSession();
   

  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const toggleRegModal = () => {
    setIsRegModalOpen(!isRegModalOpen);
  };
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const toggleLogModal = () => {
    setIsLogModalOpen(!isLogModalOpen);
  };
  return (
    <>
    <div className={styles.header_right}> 
    <nav className={styles.nav}>
    <ul className={styles.ul}>
    {session?.data && 
    <Link href="/profile">Profile</Link>
 }
    {session?.data ? (
      
      <Link href="#" onClick={() => signOut({ callbackUrl: "/" })}>
          Sign Out
      </Link>
      
        
      ) : (
              <>
              <Link href="#" onClick={toggleLogModal}>Sign In</Link>{isLogModalOpen && <LogInModal onClose={toggleLogModal} />}
              <Link href="#" onClick={toggleRegModal}>Sing Up</Link>{isRegModalOpen && <RegisterModal onClose={toggleRegModal} />}
              </>
      )}


    </ul>
    </nav>
    </div>
    </>
  );
};

export default Header_right;