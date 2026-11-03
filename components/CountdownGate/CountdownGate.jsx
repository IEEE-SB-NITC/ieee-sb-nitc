"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./CountdownGate.module.css";

/* ─── helpers ─────────────────────────────────────────────── */

/** Returns remaining ms until launchISO (clamped to 0). */
function getRemainingMs(launchISO) {
  if (!launchISO) return null;
  const target = new Date(launchISO).getTime();
  const now = Date.now();
  return Math.max(0, target - now);
}

function msToparts(ms) {
  if (ms === null) return null;
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function pad(n) {
  return String(n).padStart(2, "0");
}

/* ─── digit flip component ─────────────────────────────────── */
function FlipUnit({ value, label }) {
  const [displayVal, setDisplayVal] = useState(pad(value));
  const [flipping, setFlipping] = useState(false);
  const prevVal = useRef(pad(value));

  useEffect(() => {
    const next = pad(value);
    if (next !== prevVal.current) {
      setFlipping(true);
      const t = setTimeout(() => {
        setDisplayVal(next);
        prevVal.current = next;
        setFlipping(false);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className={styles.unit}>
      <div className={`${styles.card} ${flipping ? styles.flip : ""}`}>
        <span className={styles.digit}>{displayVal}</span>
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

/* ─── main component ───────────────────────────────────────── */
export default function CountdownGate({ children }) {
  const [launchISO, setLaunchISO] = useState(undefined); // undefined = loading
  const [remaining, setRemaining] = useState(null);
  const [launched, setLaunched] = useState(false);
  const [breaking, setBreaking] = useState(false);

  /* fetch launch time on mount */
  useEffect(() => {
    fetch("/api/launch-time")
      .then((r) => r.json())
      .then(({ launchTimeISO }) => {
        setLaunchISO(launchTimeISO ?? null);
        setRemaining(getRemainingMs(launchTimeISO));
      })
      .catch(() => setLaunchISO(null));
  }, []);

  /* tick every second */
  useEffect(() => {
    if (!launchISO) return;
    const id = setInterval(() => {
      const ms = getRemainingMs(launchISO);
      setRemaining(ms);
    }, 1000);
    return () => clearInterval(id);
  }, [launchISO]);

  /* handle "Launch" button click — shatter animation then reveal */
  const handleLaunch = useCallback(() => {
    setBreaking(true);
    setTimeout(() => setLaunched(true), 1200);
  }, []);

  /* ── loading state ── */
  if (launchISO === undefined) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingSpinner} />
      </div>
    );
  }

  /* ── no launch time set OR already launched ── */
  if (!launchISO || launched) {
    return <>{children}</>;
  }

  const parts = msToparts(remaining);
  const isZero = remaining === 0;

  return (
    <>
      {/* countdown overlay */}
      <div className={`${styles.overlay} ${breaking ? styles.breaking : ""}`}>
        {/* animated background */}
        <div className={styles.bg}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.orb3} />
          <div className={styles.grid} />
        </div>

        {/* shatter pieces (shown on breaking) */}
        {breaking && (
          <div className={styles.shatterWrapper}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={`${styles.shard} ${styles[`shard${i}`]}`} />
            ))}
          </div>
        )}

        <div className={styles.content}>
          {/* IEEE logo / branding */}
          <div className={styles.brand}>
            <span className={styles.brandDot} />
            <span className={styles.brandText}>IEEE SB NITC</span>
          </div>

          <h1 className={styles.headline}>
            Something <span className={styles.accent}>Exciting</span>
            <br />
            is Coming
          </h1>

          <p className={styles.subtext}>
            We&apos;re putting the final touches on our new website.
            <br />
            Stay tuned — it&apos;ll be worth the wait.
          </p>

          {/* countdown units */}
          {parts && !isZero && (
            <div className={styles.countdown}>
              <FlipUnit value={parts.days} label="Days" />
              <div className={styles.colon}>:</div>
              <FlipUnit value={parts.hours} label="Hours" />
              <div className={styles.colon}>:</div>
              <FlipUnit value={parts.minutes} label="Minutes" />
              <div className={styles.colon}>:</div>
              <FlipUnit value={parts.seconds} label="Seconds" />
            </div>
          )}

          {/* launch button — shown only when countdown hits zero */}
          {isZero && (
            <div className={styles.launchWrapper}>
              <p className={styles.readyText}>We&apos;re live! 🚀</p>
              <button
                className={styles.launchBtn}
                onClick={handleLaunch}
              >
                <span className={styles.launchBtnInner}>Launch Website</span>
                <span className={styles.launchBtnGlow} />
              </button>
            </div>
          )}

          {/* IST label */}
          <p className={styles.istNote}>All times in Indian Standard Time (IST)</p>
        </div>
      </div>

      {/* real site (hidden underneath until launched) */}
      <div style={{ display: "none" }}>{children}</div>
    </>
  );
}
