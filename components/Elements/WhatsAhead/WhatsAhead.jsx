"use client";

import { useEffect, useState } from "react";
import styles from "./WhatsAhead.module.css";
import { MdWorkHistory } from "react-icons/md";
import { FaLocationDot, FaCalendarXmark } from "react-icons/fa6";

export default function WhatsAhead() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/events?type=upcoming")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setEvents(data.data);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className={styles.body}>
            <h1 className={styles.heading}>What's Ahead</h1>
            {loading ? (
                <div className={styles.emptyState}>
                    <div className={styles.spinner}></div>
                </div>
            ) : events.length === 0 ? (
                <div className={styles.emptyState}>
                    <FaCalendarXmark className={styles.emptyIcon} />
                    <p className={styles.emptyTitle}>No Upcoming Events</p>
                    <p className={styles.emptySubtitle}>
                        Stay tuned — exciting events are being planned. Check back soon!
                    </p>
                </div>
            ) : (
                <dl className={styles.ak}>
                    {events.map((event) => (
                        <div key={event._id} className={styles.card}>
                            <div className={styles.top}>
                                <img
                                    className={styles.circleImg}
                                    src={event.imageUrl}
                                    alt={event.title}
                                />
                            </div>
                            <div className={styles.eventDetails}>
                                <h2 className={styles.eventTitle}>{event.title}</h2>
                                <div className={styles.detailItem}>
                                    <span className={styles.icon}><MdWorkHistory /></span>
                                    <span>
                                        {new Date(event.date).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.icon}><FaLocationDot /></span>
                                    <span>{event.venue}</span>
                                </div>
                                <button className={styles.registerButton}>
                                    <span className={styles.registerText}>Register Now</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </dl>
            )}
        </div>
    );
}