// import logo from "./assets/logo.png";
import Image from "next/image";
import styles from "./OurTeamHearder.module.css";
function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.main}>
        <div>
          <Image
            className={styles.logo}
            src="/assets/logo.png"
            alt="Logo"
            width={100}
            height={70}
          />
          {/* <img className="logo" src={logo} alt="" /> */}
        </div>
        <div className={styles.items}>
          <button className={styles.btn}>Home</button>
          <button className={styles.btn}>Chapters</button>
          <button className={styles.btn}>Execom</button>
          <button className={styles.btn}>Gallery</button>
          <button className={styles.btn}>Contact Us</button>
          <button className={styles.btn}>Blogs</button>
          <button className={styles.btn}>Join IEEE</button>
        </div>
      </div>
      <div className={styles.ieee}>
        <span className={styles.ieee1}>IEEE SB NITC</span>
        <span className={styles.ieee2}>EXECOM 2025-26</span>
      </div>
      <div className={styles.moto}>
        "Where Passion meets technology, we pave the way for engineering
        excellence"
      </div>
      <div className={styles.meet}>
        <span className={styles.meetFirst}>MEET</span> OUR{" "}
        <span className={styles.meetSecond}>TEAM</span>
      </div>
    </div>
  );
}

export default Header;
