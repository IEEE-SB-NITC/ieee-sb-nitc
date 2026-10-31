import React from "react";
import styles from "./Info.module.css";
import Image from "next/image";
import image from "../../../public/image.png"
const Info = () => {
  return (
    <div className={styles.Info}>
      <h1 className={styles.heading}>Our Legacy of Impact</h1>
      <div className={styles.container}>
        <div className={styles.outer}>
          <Image className={styles.img} src={image} alt="ieee-outstanding-img-poster" width="auto" height="auto"/>
          <div className={styles.info}>
            <span>IEEE SB NITC</span> is honored to receive the{" "}
            <span>Outstanding Student Branch Award</span> from the{" "}
            <span>IEEE India Council</span>. This recognition reflects the collective
            efforts of our members, mentors, and volunteers, who have worked
            tirelessly to create opportunities for learning, innovation, and
            community impact. From hosting diverse events to addressing societal
            challenges through technology, every step has been a testament to
            our shared dedication and collaboration.
            <br></br>We sincerely thank the IEEE India Council for this
            recognition, which motivates us to continue striving for excellence
            in all our endeavors.
          </div>
        </div>
      </div>
    </div>
  );
};
export default Info;
