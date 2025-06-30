import React from "react";
import Features from "@/components/Features/Features";
import Slider from "@/components/Slider/Slider";
import styles from "./root.module.css";
import Count from "@/components/Elements/Count/Count";
import Scroll from "@/components/Elements/Scroll/Scroll";
import Info from "@/components/Elements/Info/Info";
import Carousel from "@/components/Elements/Latest_events/event-carousel";
import Reveal from "../../components/RevealAnimation/Reveal";
const page = () => {
    return (
        <div className={styles.root}>
            <div className={styles.mainContainer}>
                <div className={styles.background}>
                    <div className={styles.image1}></div>
                    <div className={styles.image2}></div>
                </div>
                <div className={styles.main}>
                    <div className={styles.textWrapper}>
                        <h1>
                            Welcome To{" "}
                            <span className={styles.highlight}>
                                IEEE SB NITC
                            </span>
                        </h1>
                    </div>
                    <div className={styles.textWrapper}>
                        <p>
                            | The Official Website Of IEEE Student Branch NIT,
                            Calicut |
                        </p>
                    </div>
                </div>

                <div className={styles.card}>
                    <p>
                        IEEE SB NITC strives to{" "}
                        <strong>
                            foster innovation, knowledge-sharing and
                            professional growth
                        </strong>{" "}
                        among its members. Through our events, we provide a
                        platform for students to explore emerging technologies,
                        expand their network and develop crucial skills. Join us
                        as we embark on this exciting journey of innovation and
                        growth!
                    </p>
                    <button>About Us</button>
                </div>
            </div>
            <Slider />
            <Features />
            <Scroll />
            <Count />
            <Reveal>
                <Info />
            </Reveal>
            <Carousel />
        </div>
    );
};

export default page;
