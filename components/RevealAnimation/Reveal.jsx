"use client";
import { useLayoutEffect, useRef } from "react";
import styles from "./Reveal.module.css";

export default function ScrollReveal({ children, className = "" }) {
    const ref = useRef();

    /*
     * useLayoutEffect fires synchronously after DOM mutations but BEFORE the
     * browser paints.  This means the element's transform/opacity are set to
     * their correct values on the very first frame — no flash of the hidden
     * (opacity:0 / translateY(200px) / scale(0.3)) state that happens with
     * useEffect when navigating to the homepage via a client-side Link.
     */
    useLayoutEffect(() => {
        const el = ref.current;

        const computeState = () => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const start = windowHeight * 0.9;
            const end = windowHeight * 0.18;

            const progress = (start - rect.top * 0.5) / (start - end);
            const clamped = Math.min(Math.max(progress, 0), 1);
            return { clamped, rect };
        };

        // Set the correct initial state immediately — before first paint.
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

            // Reset if scrolling up and element has left the top of the viewport
            const scrollY = window.scrollY;
            if (scrollY < lastScrollTop && rect.top > window.innerHeight) {
                el.style.opacity = 0;
                el.style.transform = "translateY(200px) scale(0.3)";
            }

            lastScrollTop = scrollY;
            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);

        // Cancel the RAF loop on unmount to prevent zombie loops across navigations
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