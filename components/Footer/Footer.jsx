import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer} >
      <div className={styles.top}>
        <div className={styles["top-line"]}></div>
        <div className={styles["top-content"]}>
          <div className={`${styles.box} ${styles.box1}`}>
            <div>
              <span className={styles["box1-span-title"]}>IEEE SB NITC</span>
            </div>
            <div className={styles["box1-content"]}>
              <div>Thank you for visiting our website!</div>
              <div>
                "Prepare to embark on a captivating journey through the
                corridors of innovation."
              </div>
              <div>We warmly appreciate your visit and support.</div>
            </div>{" "}
            <div className={styles["box1-end"]}>
              <a href="https://www.facebook.com/p/IEEE-SB-NITC-61560005524345/" target="_blank" rel="noopener">
                <Image
                  src="/facebook-icon.svg"
                  alt="icon"
                  width={35}
                  height={30.8}
                />
              </a>
              <a href="https://www.instagram.com/ieee_nitc/" target="_blank" rel="noopener">
                <Image
                  src="/instagram-icon.svg"
                  alt="icon"
                  width={35}
                  height={30.8}
                />
              </a>
              <a href="https://in.linkedin.com/company/ieee-sb-nitc" target="_blank" rel="noopener">
                <Image
                  src="/linkedin-icon.svg"
                  alt="icon"
                  width={35}
                  height={30.8}
                />
              </a>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles["box25-title"]}>QUICK LINKS</div>
            <ul className={styles["box25-content"]}>
              <li>
                <a href="https://www.ieee.org/" target="_blank" rel="noopener">
                  IEEE.ORG
                </a>
              </li>
              <li>
                <a
                  href="https://ieeextreme.org/"
                  target="_blank"
                  rel="noopener"
                >
                  IEEE XTREME
                </a>
              </li>
              <li>
                <a
                  href="https://ieeexplore.ieee.org/Xplore/home.jsp"
                  target="_blank"
                  rel="noopener"
                >
                  IEEE Xplore
                </a>
              </li>
              <li>
                <a
                  href="https://www.ieee.org/about/index.html"
                  target="_blank"
                  rel="noopener"
                >
                  IEEE
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.box}>
            <div className={styles["box25-title"]}>MEMBERSHIPS</div>
            <ul className={styles["box25-content"]}>
              <li>
                <a
                  href="https://www.ieee.org/membership/join/index.html"
                  target="_blank"
                  rel="noopener"
                >
                  Join IEEE
                </a>
              </li>
              <li>
                <a
                  href="https://www.ieee.org/membership-catalog/index.html?srchProdType=Societies&searchType=prodType"
                  target="_blank"
                  rel="noopener"
                >
                  Join a Society
                </a>
              </li>
              <li>
                <a
                  href="https://www.ieee.org/membership/renew.html?utm_source=button_text&utm_medium=lp-membership&utm_campaign=renew"
                  target="_blank"
                  rel="noopener"
                >
                  Renew Membership
                </a>
              </li>
              <li>
                <a
                  href="https://www.ieee.org/membership/benefits/index.html"
                  target="_blank"
                  rel="noopener"
                >
                  Info
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.box}>
            <div className={styles["box25-title"]}>SOCIETIES</div>
            <ul
              className={`${styles["box25-content"]} ${styles["box4-content"]}`}
            >
              <li>CASS</li>
              <li>ComSoc</li>
              <li>CS</li>
              <li>CSS</li>
              <li>IAS</li>
              <li>EDS</li>
              <li>EdSoc</li>
              <li>RAS</li>
              <li>SPS</li>
            </ul>
          </div>
          <div className={`${styles.box} ${styles.box5}`}>
            <div className={styles["box25-title"]}>
              AFFINITY AND SPECIAL INTEREST GROUP
            </div>
            <ul className={styles["box25-content"]}>
              <li>WIE</li>
              <li>SIGHT</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles["bottom-line"]}></div>
        <div className={styles["bottom-content"]}>
          © Copyright {year} IEEE SB NITC
        </div>
      </div>
    </footer>
  );
};

export default Footer;
