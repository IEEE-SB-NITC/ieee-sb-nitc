"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./CountdownGate.module.css";

/* ─── helpers ─────────────────────────────────────────────── */
function getRemainingMs(launchISO) {
  if (!launchISO) return null;
  const target = new Date(launchISO).getTime();
  return Math.max(0, target - Date.now());
}

function msToParts(ms) {
  if (ms === null) return null;
  const totalSeconds = Math.floor(ms / 1000);
  const days    = Math.floor(totalSeconds / 86400);
  const hours   = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function pad(n) {
  return String(n).padStart(2, "0");
}

/* ─── static unit (no flip) ───────────────────────────────── */
function StaticUnit({ value, label }) {
  return (
    <div className={styles.unit}>
      <div className={styles.card}>
        <span className={styles.digit}>{pad(value)}</span>
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

/* ─── flipping unit (seconds only) ───────────────────────── */
function FlipUnit({ value, label }) {
  const [displayVal, setDisplayVal] = useState(pad(value));
  const [flipping, setFlipping]     = useState(false);
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
  const [launchISO, setLaunchISO] = useState(undefined);
  const [remaining, setRemaining] = useState(null);
  const [launched,  setLaunched]  = useState(false);
  const [breaking,  setBreaking]  = useState(false);

  useEffect(() => {
    fetch("/api/launch-time")
      .then((r) => r.json())
      .then(({ launchTimeISO }) => {
        setLaunchISO(launchTimeISO ?? null);
        setRemaining(getRemainingMs(launchTimeISO));
      })
      .catch(() => setLaunchISO(null));
  }, []);

  useEffect(() => {
    if (!launchISO) return;
    const id = setInterval(() => setRemaining(getRemainingMs(launchISO)), 1000);
    return () => clearInterval(id);
  }, [launchISO]);

  const handleLaunch = useCallback(() => {
    setBreaking(true);
    setTimeout(() => setLaunched(true), 1200);
  }, []);

  /* loading */
  if (launchISO === undefined) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingSpinner} />
      </div>
    );
  }

  /* no launch time set or already launched */
  if (!launchISO || launched) return <>{children}</>;

  const parts  = msToParts(remaining);
  const isZero = remaining === 0;

  return (
    <>
      <div className={`${styles.overlay} ${breaking ? styles.breaking : ""}`}>
        {/* subtle background */}
        <div className={styles.bg}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.grid} />
        </div>

        {/* shatter shards */}
        {breaking && (
          <div className={styles.shatterWrapper}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={`${styles.shard} ${styles[`shard${i}`]}`} />
            ))}
          </div>
        )}

        <div className={styles.content}>
          {/* brand */}
          <div className={styles.brand}>
            <span className={styles.brandDot} />
            <span className={styles.brandText}>IEEE SB NITC</span>
          </div>

          {/* single tagline */}
          <p className={styles.tagline}>Stay tuned for the launch.</p>

          {/* countdown */}
          {parts && !isZero && (
            <div className={styles.countdown}>
              <StaticUnit value={parts.days}    label="Days" />
              <div className={styles.colon}>:</div>
              <StaticUnit value={parts.hours}   label="Hours" />
              <div className={styles.colon}>:</div>
              <StaticUnit value={parts.minutes} label="Minutes" />
              <div className={styles.colon}>:</div>
              <FlipUnit   value={parts.seconds} label="Seconds" />
            </div>
          )}

          {/* launch button — only at zero */}
          {isZero && (
            <div className={styles.launchWrapper}>
              <p className={styles.readyText}>We&apos;re live! 🚀</p>
              <button className={styles.launchBtn} onClick={handleLaunch}>
                <span className={styles.launchBtnInner}>Launch Website</span>
                <span className={styles.launchBtnGlow} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "none" }}>{children}</div>
    </>
  );
}
