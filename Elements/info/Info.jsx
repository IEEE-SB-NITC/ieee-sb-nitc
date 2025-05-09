
import React from "react";
import styles from "./info.module.css";
// import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css";

const Info = ()=>{
    return(
        <>
        <h1 className={styles.heading}>Our Legacy of Impact</h1>

        <br></br>
    <div className={styles.container}>
        
        <div className={styles.outer}>
            <div className={styles.img}>

            </div>
            <div className={styles.info}>
                

<b>IEEE SB NITC</b> is honored to receive the <b>Outstanding Student Branch Award</b> from the <b>IEEE India Council</b>. This recognition reflects the collective efforts of our members, mentors, and volunteers, who have worked tirelessly to create opportunities for learning, innovation, and community impact. From hosting diverse events to addressing societal challenges through technology, every step has been a testament to our shared dedication and collaboration.
<br></br>We sincerely thank the IEEE India Council for this recognition, which motivates us to continue striving for excellence in all our endeavors. 
            </div>
            
        </div>
        
    </div>
    
    <button className={styles.button}>See more <i className="fa-solid fa-arrow-right"></i></button>
    </>
    )
};
export default Info;