import React from "react";
import styles from "./contact.module.css";
import MapWrapper from "../../../components/Elements/Map/MapWrapper";

const page = () => {
  return (
    <div>
      <div className={styles.back}></div>
      <div className={styles.header}>
        <div className={styles.infoT1}>Contact Us</div>
        <div className={styles.infoT6}>Get in Touch with IEEE SB NITC</div>
      </div>

      <div className={styles.container}>
        {/* ── Contact Form ── */}
        <div className={styles.formCardBox}>
          <div className={styles.formCard}>
            <div className={styles.infoT5}>Send a Message</div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label className={styles.infoT4}>Name</label>
                <input type="text" className={styles.inputNnE} placeholder="Your name" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.infoT4}>Email</label>
                <input type="email" className={styles.inputNnE} placeholder="you@example.com" />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.infoT4}>Subject</label>
              <input type="text" className={styles.input} placeholder="What's this about?" />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.infoT4}>Message</label>
              <textarea className={styles.textarea} placeholder="Write your message here…"></textarea>
            </div>

            <button className={styles.button}>Send Message</button>
          </div>
        </div>

        {/* ── Contact Info + Map ── */}
        <div className={styles.contactInfo}>
          <div className={styles.contactInfoBox}>
            <div className={styles.infoT}>Contact Information</div>

            <div className={styles.infoDetail}>
              <div className={styles.infoT2}>Address</div>
              <div className={styles.infoT3}>
                Mukkam Road, Kattangal
                <br />
                Kozhikode, Kerala
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.infoDetail}>
              <div className={styles.infoT2}>E-mail</div>
              <div className={styles.infoT3}>ieeesb@nitc.ac.in</div>
            </div>
          </div>

          <div className={styles.map}>
            <MapWrapper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
