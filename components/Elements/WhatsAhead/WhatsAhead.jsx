import styles from "./WhatsAhead.module.css";
import { MdWorkHistory } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

async function getUpcomingEvents() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/events?type=upcoming`,
            { cache: "no-store" }
        );
        const data = await res.json();
        return data.success ? data.data : [];
    } catch (err) {
        return [];
    }
}

export default async function WhatsAhead() {
    const events = await getUpcomingEvents();

    if (events.length === 0) return null;

    return (
        <div className={styles.body}>
            <h1 className={styles.heading}>What's Ahead</h1>
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
        </div>
    );
}