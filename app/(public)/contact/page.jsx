import React from "react";
import styles from "./contact.module.css";
import ComingSoonDesign from "../../../components/Elements/CommingSoon/CommingSoon";
const page = () => {
  return (
    <div>
      <div className={styles.back}></div>
      <div className={styles.header}>
        <div className={styles.infoT1}>Contact Us</div>
        <div className={styles.infoT6}>Get in Touch with IEEE SB NITC</div>
      </div>

      <div className={styles.container}>
        <div className={styles.formCardBox}>
          <div className={styles.formCard}>
            <div className={styles.infoT5}>SEND A MESSAGE</div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <div className={styles.infoT4}>Name:</div>
                <input type="text" className={styles.inputNnE} />
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.infoT4}>Email:</div>
                <input type="email" className={styles.inputNnE} />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.infoT4}>Subject:</div>
              <input type="text" className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.infoT4}>Messages:</div>
              <textarea className={styles.textarea}></textarea>
            </div>

            <button className={styles.button}>Contact Us</button>
          </div>
        </div>

        <div className={styles.contactInfo}>
          <div className={styles.contactInfoBox}>
            <div className={styles.infoT}>Contact Information</div>
            <div className={styles.infoT2}>Address</div>
            <div className={styles.infoT3}>
              Mukkam Road
              <br />
              Kattangal
              <br />
              Kozhikode, Kerala
            </div>
            <div className={styles.infoT2}>E-mail</div>

            <div className={styles.infoT3}>ieeesb@nitc.ac.in</div>
          </div>

          <img className={styles.map} src="/nitc_map.png" alt="NITC Map" />
        </div>
      </div>
    </div>
  );
};

export default page;
