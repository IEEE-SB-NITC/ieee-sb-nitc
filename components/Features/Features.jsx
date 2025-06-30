import React from "react";
import Image from "next/image";
import image1 from "@/public/features-1.svg";
import image2 from "@/public/features-2.png";
import image3 from "@/public/features-3.png";
import styles from "./Features.module.css";
const Features = () => {
  return (
    <div className={`${styles.section} autoShow`}>
      <div className={styles.left}>
        <h2>WHY IEEE?</h2>
        <h6>
          Our project aims to establish a global standardization platform
          dedicated to knowledge sharing and education
        </h6>
      </div>
      <div className={styles.right}>
        <div className={styles.box} id={styles.box1}>
          <h3>Global Standardization</h3>
          <Image
            src={image1}
            className={styles.image}
            width={110}
            height={110}
            alt="icon"
          />
          <p>
            Set global standards for various technological domains. It develops
            and publishes technical standards that ensure interoperability,
            compatibility, and safety across industries. IEEE's standards cover
            a wide range of areas, including wireless communication, power
            systems, software engineering, and more.
          </p>
        </div>
        <div className={styles.box} id={styles.box2}>
          <h3>Knowledge Sharing</h3>
          <Image
            src={image2}
            className={styles.image}
            width={110}
            height={110}
            alt="icon"
          />
          <p>
            A vast platform for knowledge sharing and networking among
            professionals, researchers, and students in the field of electrical
            engineering, electronics, and related disciplines. Through
            conferences, workshops, and publications, IEEE facilitates the
            exchange of ideas, research findings, and best practices.
          </p>
        </div>

        <div className={styles.box} id={styles.box3}>
          <h3>Education and Professional Development</h3>
          <Image
            src={image3}
            className={styles.image}
            width={110}
            height={110}
            alt="icon"
          />
          <p>
            A range of educational resources and professional development
            opportunities to support the growth and expertise of its members. It
            provides access to technical journals, magazines, and online
            libraries, which are valuable sources of research papers, articles,
            and industry trends.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
