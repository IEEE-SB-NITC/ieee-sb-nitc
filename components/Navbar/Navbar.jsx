'use client';
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/public/Logos/IEEE SB40.png";
import NavIcon from "@/public/nav-icon.svg";
import CloseIcon from "@/public/nav-close-icon.svg"; 
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/">
          <Image className={styles.logo} src={Logo} width="210" height="auto" alt="ieee logo" />
        </Link>

        <ul className={styles.ul}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/chapters">Chapters</Link></li>
          <li><Link href="/ourTeam">Execom</Link></li>
          <li><Link href="/gallery">Gallery</Link></li>
          <li><Link href="/contact">Contact Us</Link></li>
          <li><Link href="/blogs">Blogs</Link></li>
          <button className={styles.button}>Join IEEE</button>
          <Link href="/login" className={styles.loginButton}>Login</Link>
        </ul>
        <Image
          src={NavIcon}
          width={30}
          height={30}
          alt="Menu"
          className={styles.menuIcon}
          onClick={toggleSidebar}
          />
      </nav>

      <div className={`${styles.backdrop} ${sidebarOpen ? styles.active : ""}`} onClick={toggleSidebar}></div>

      <div className={`${styles.sidebar} ${sidebarOpen ? styles.active : ""}`}>
        <Image
          src={CloseIcon}
          width={20}
          height={20}
          alt="Close"
          className={styles.closeIcon}
          onClick={toggleSidebar}
        />
        <ul className={styles.sidebarUl}>
          <li><Link href="/chapters">Chapters</Link></li>
          <li><Link href="/ourTeam">Execom</Link></li>
          <li><Link href="/gallery">Gallery</Link></li>
          <li><Link href="/contact">Contact Us</Link></li>
          <li><Link href="/blogs">Blogs</Link></li>
          <li><Link href="/join">Join IEEE</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
