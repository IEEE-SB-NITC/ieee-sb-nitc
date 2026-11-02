"use client";
import { useEffect, useRef } from "react";
import styles from "./Reveal.module.css";

export default function ScrollReveal({ children, className = "" }) {
    const ref = useRef();

    useEffect(() => {
        const el = ref.current;

        // Compute the initial visibility immediately so elements that are
        // already in the viewport on mount (e.g. after a client-side navigation
        // where the page starts at scroll 0 but the previous scroll position
        // may still be reflected in getBoundingClientRect) are shown correctly.
        const computeState = () => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const start = windowHeight * 0.9;
            const end = windowHeight * 0.18;

            const progress = (start - rect.top * 0.5) / (start - end);
            const clamped = Math.min(Math.max(progress, 0), 1);
            return { clamped, rect };
        };

        // Apply the correct initial state synchronously so there is no flash
        // of the "hidden" transform when arriving via client-side navigation.
        const { clamped: initialClamped } = computeState();
        el.style.opacity = initialClamped;
        el.style.transform = `translateY(${(1 - initialClamped) * 200}px) scale(${
            0.3 + 0.7 * initialClamped
        })`;

        let lastScrollTop = window.scrollY;
        let rafId;

        const animate = () => {
            const { clamped, rect } = computeState();

            el.style.opacity = clamped;
            el.style.transform = `translateY(${(1 - clamped) * 200}px) scale(${
                0.3 + 0.7 * clamped
            })`;

            // Reset if scrolling up and element has left the viewport above
            const scrollY = window.scrollY;
            if (scrollY < lastScrollTop && rect.top > window.innerHeight) {
                el.style.opacity = 0;
                el.style.transform = "translateY(200px) scale(0.3)";
            }

            lastScrollTop = scrollY;
            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);

        // Clean up the RAF loop when the component unmounts (navigation away)
        return () => {
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div ref={ref} className={`${styles.scrollReveal} ${className}`}>
            {children}
        </div>
    );
}