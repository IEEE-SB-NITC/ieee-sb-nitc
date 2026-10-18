'use client';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/Logos/IEEE SB40.png";
import NavIcon from "@/public/nav-icon.svg";
import CloseIcon from "@/public/nav-close-icon.svg"; 
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <Link href="/">
          <Image className={styles.logo} src={Logo} width={180} height={50} alt="ieee logo" />
        </Link>

        <ul className={styles.ul}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/ourTeam">Execom</Link></li>
          <li><Link href="/gallery">Gallery</Link></li>
          <li><Link href="/contact">Contact Us</Link></li>
          <li><Link href="/blogs">Blogs</Link></li>
          <button className={styles.button}>Join IEEE</button>
          <Link href="/login" className={styles.loginButton}>Login</Link>
        </ul>
        <Image
          src={NavIcon}
          width={28}
          height={28}
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
        <div className={styles.sidebarLogo}>
          <Image src={Logo} width={140} height={40} alt="ieee logo" />
        </div>
        <ul className={styles.sidebarUl}>
          <li><Link href="/" onClick={toggleSidebar}>Home</Link></li>
          <li><Link href="/ourTeam" onClick={toggleSidebar}>Execom</Link></li>
          <li><Link href="/gallery" onClick={toggleSidebar}>Gallery</Link></li>
          <li><Link href="/contact" onClick={toggleSidebar}>Contact Us</Link></li>
          <li><Link href="/blogs" onClick={toggleSidebar}>Blogs</Link></li>
        </ul>
        <div className={styles.sidebarActions}>
          <Link href="/join" className={styles.sidebarJoinBtn} onClick={toggleSidebar}>Join IEEE</Link>
          <Link href="/login" className={styles.sidebarLoginBtn} onClick={toggleSidebar}>Login</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
