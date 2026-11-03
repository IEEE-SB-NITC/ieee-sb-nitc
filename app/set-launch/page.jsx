"use client";

import { useState, useEffect } from "react";
import styles from "./setLaunch.module.css";

/* ── helpers ── */
/** Convert a JS Date to "YYYY-MM-DDTHH:MM" in IST for <input type="datetime-local"> */
function toISTInputValue(date) {
  if (!date) return "";
  // IST = UTC+5:30
  const ist = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
  return ist.toISOString().slice(0, 16);
}

/** Convert value from <input type="datetime-local"> (treated as IST) to ISO string */
function istInputToISO(value) {
  if (!value) return null;
  // value is "YYYY-MM-DDTHH:MM" — interpret as IST
  const [datePart, timePart] = value.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  // Build UTC equivalent
  const utcMs =
    Date.UTC(year, month - 1, day, hour, minute) - 5.5 * 60 * 60 * 1000;
  return new Date(utcMs).toISOString();
}

/** Format ISO to a readable IST string */
function formatIST(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

/* ── current IST clock ── */
function ISTClock() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return null;
  return (
    <span>
      {now.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}
    </span>
  );
}

/* ── page ── */
export default function SetLaunchPage() {
  const [currentISO, setCurrentISO] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  /* load current launch time */
  useEffect(() => {
    fetch("/api/launch-time")
      .then((r) => r.json())
      .then(({ launchTimeISO }) => {
        setCurrentISO(launchTimeISO ?? null);
        if (launchTimeISO) {
          setInputValue(toISTInputValue(new Date(launchTimeISO)));
        }
      })
      .finally(() => setFetching(false));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue) {
      setStatus("error");
      setMsg("Please pick a date and time.");
      return;
    }
    const iso = istInputToISO(inputValue);
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/launch-time", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ launchTimeISO: iso }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unknown error");
      setCurrentISO(iso);
      setStatus("success");
      setMsg("Launch time saved successfully!");
    } catch (err) {
      setStatus("error");
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleClear() {
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/launch-time", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ launchTimeISO: null }),
      });
      if (!res.ok) throw new Error("Failed to clear");
      setCurrentISO(null);
      setInputValue("");
      setStatus("success");
      setMsg("Launch time cleared. Countdown disabled; site is now live.");
    } catch (err) {
      setStatus("error");
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      {/* animated bg */}
      <div className={styles.bg}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.grid} />
      </div>

      <div className={styles.card}>
        {/* header */}
        <div className={styles.header}>
          <div className={styles.iconWrap}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <h1 className={styles.title}>Launch Timer</h1>
            <p className={styles.subtitle}>Set the website countdown in Indian Standard Time</p>
          </div>
        </div>

        {/* IST now */}
        <div className={styles.nowRow}>
          <span className={styles.nowLabel}>Current IST time:</span>
          <span className={styles.nowValue}><ISTClock /></span>
        </div>

        {/* current setting */}
        {!fetching && (
          <div className={`${styles.currentBox} ${currentISO ? styles.currentBoxActive : styles.currentBoxEmpty}`}>
            <span className={styles.currentLabel}>
              {currentISO ? "🟢 Countdown active until" : "⚪ No launch time set"}
            </span>
            {currentISO && (
              <span className={styles.currentValue}>{formatIST(currentISO)}</span>
            )}
            {!currentISO && (
              <span className={styles.currentHint}>Website is publicly accessible</span>
            )}
          </div>
        )}

        {/* form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.fieldLabel} htmlFor="launchDt">
            New Launch Date &amp; Time (IST)
          </label>
          <input
            id="launchDt"
            type="datetime-local"
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <p className={styles.hint}>
            The countdown screen will hide and the website goes live exactly at this time (IST).
          </p>

          {/* status message */}
          {status && (
            <div className={`${styles.alert} ${status === "success" ? styles.alertSuccess : styles.alertError}`}>
              {status === "success" ? "✓" : "✕"} {msg}
            </div>
          )}

          <div className={styles.actions}>
            <button type="submit" className={styles.btnPrimary} disabled={loading}>
              {loading ? "Saving…" : "Set Launch Time"}
            </button>
            <button
              type="button"
              className={styles.btnDanger}
              disabled={loading || !currentISO}
              onClick={handleClear}
            >
              Clear &amp; Go Live
            </button>
          </div>
        </form>

        <p className={styles.footer}>
          IEEE SB NITC · Launch Timer Admin ·{" "}
          <a href="/" className={styles.footerLink}>← Back to site</a>
        </p>
      </div>
    </div>
  );
}
