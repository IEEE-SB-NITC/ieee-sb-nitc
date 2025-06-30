"use client";
import { useEffect, useRef } from "react";
import styles from "./Reveal.module.css";

export default function ScrollReveal({ children, className = "" }) {
    const ref = useRef();

    useEffect(() => {
        const el = ref.current;
        let lastScrollTop = window.scrollY;

        const animate = () => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Animation starts when top of element is at 90% of viewport (10% visible)
            // and ends when top is at 10% of viewport (almost fully visible)
            const start = windowHeight * .9; // 90% down the screen
            const end = windowHeight * 0.1; // 10% from top

            const progress = (start - rect.top*.5) / (start - end);
            const clamped = Math.min(Math.max(progress, 0), 1);

            el.style.opacity = clamped;
            el.style.transform = `translateY(${(1 - clamped) * 200}px) scale(${
                0.3 + 0.7 * clamped
            })`;

            // Reset if scrolling up and out of view
            const scrollY = window.scrollY;
            if (scrollY < lastScrollTop && rect.top > windowHeight) {
                el.style.opacity = 0;
                el.style.transform = "translateY(200px) scale(0.3)";
            }

            lastScrollTop = scrollY;
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, []);

    return (
        <div ref={ref} className={`${styles.scrollReveal} ${className}`}>
            {children}
        </div>
    );
}
