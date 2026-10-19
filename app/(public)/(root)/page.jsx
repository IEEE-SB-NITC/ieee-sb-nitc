import React from "react";
import Features from "@/components/Features/Features";
import styles from "./root.module.css";
import Count from "@/components/Elements/Count/Count"
import Scroll from "@/components/Elements/Scroll/Scroll"
import Info from "@/components/Elements/Info/Info"
import Carousel from "@/components/Elements/Latest_events/event-carousel"
import Reveal from "../../../components/RevealAnimation/Reveal";
import WhatsAhead from "@/components/Elements/WhatsAhead/WhatsAhead";
import Link from "next/link";

const page = () => {
    return (
        <div className={styles.root}>
            {/* Background decorative layers */}
            <div className={styles.background}>
                <div className={styles.image1}></div>
                <div className={styles.image2}></div>
            </div>

            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <div className={styles.heroBadge}>
                        <span className={styles.heroBadgeDot}></span>
                        IEEE Student Branch · Est. 1984
                    </div>
                    <div className={styles.textWrapper}>
                        <h1 className={styles.heroTitle}>
                            Welcome To{" "}
                            <span className={styles.highlight}>
                                IEEE SB NITC
                            </span>
                        </h1>
                    </div>
                    <div className={styles.textWrapper}>
                        <p className={styles.heroSubtitle}>
                            The Official Website of IEEE Student Branch,{" "}
                            National Institute of Technology Calicut
                        </p>
                    </div>
                    <div className={styles.heroCtas}>
                        <Link href="/join" className={styles.ctaPrimary}>Join IEEE</Link>
                        <Link href="/ourTeam" className={styles.ctaSecondary}>Meet the Team</Link>
                    </div>
                </div>

                {/* Hero description card */}
                <div className={styles.heroCard}>
                    <p>
                        IEEE SB NITC strives to{" "}
                        <strong>
                            foster innovation, knowledge-sharing and
                            professional growth
                        </strong>{" "}
                        among its members. Through our events, we provide a
                        platform for students to explore emerging technologies,
                        expand their network and develop crucial skills.
                    </p>
                    <Link href="/contact" className={styles.cardLink}>Get in Touch →</Link>
                </div>

                {/* Scroll indicator */}
                <div className={styles.scrollIndicator}>
                    <div className={styles.scrollMouse}>
                        <div className={styles.scrollWheel}></div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <Reveal><WhatsAhead /></Reveal>
            <Reveal><Features /></Reveal>
            <Scroll />
            <Reveal><Count /></Reveal>
            <Reveal><Info /></Reveal>
            <Reveal><Carousel /></Reveal>
        </div>
    );
};

export default page;
