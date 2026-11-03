"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Count.module.css";

const CountItem = ({ end, label }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [hasAnimated]);

    useEffect(() => {
        if (!hasAnimated) return;

        const increment = end > 100 ? 5 : 1;
        const interval = 2000 / (end / increment);

        if (count < end) {
            const timer = setTimeout(() => {
                setCount((prev) => Math.min(prev + increment, end));
            }, interval);
            return () => clearTimeout(timer);
        }
    }, [count, end, hasAnimated]);

    return (
        <div className={styles.inner} ref={ref}>
            <p>{count}+</p>
            {label}
        </div>
    );
};


const Count = () => {
    return (
        <div className={styles.outer}>
            <CountItem end={700} label="Members" />
            <CountItem end={15} label="Societies" />
            <CountItem end={100} label="Events" />
            <CountItem end={300} label="Professional Members" />
        </div>
    );
};
export default Count;
