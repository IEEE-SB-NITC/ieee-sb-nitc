"use client";

import { useState, useEffect } from "react";
import styles from "./EventsManager.module.css";

const CHAPTERS = ["aess", "cass", "comsoc", "cs", "css", "eds", "edsoc", "ias", "pels", "pes", "ras", "sensor-council", "sight", "sps", "wie"];

export default function EventsManager({ session }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [activeTab, setActiveTab] = useState("upcoming");
    const [showForm, setShowForm] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    const callerRole = session.user.role
    const isScopedToSociety = ["society_admin", "society_member"].includes(callerRole)

    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        venue: "",
        chapter: "aess",
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    async function fetchEvents() {
        setLoading(true);
        try {
            const url = isScopedToSociety
              ? `/api/events?society_id=${session.user.societyId}`
              : "/api/events"
            const res = await fetch(url);
            const data = await res.json();
            if (data.success) setEvents(data.data);
        } catch (err) {
            setError("Failed to fetch events");
        } finally {
            setLoading(false);
        }
    }

    function handleFormChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    }

    async function uploadToCloudinary(file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        );

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            { method: "POST", body: formData }
        );

        const data = await res.json();
        return { url: data.secure_url, publicId: data.public_id };
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!imageFile) {
            setError("Please select an image");
            return;
        }

        setSubmitting(true);

        try {
            const { url, publicId } = await uploadToCloudinary(imageFile);

            const res = await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    imageUrl: url,
                    imagePublicId: publicId,
                }),
            });

            const data = await res.json();

            if (data.success) {
                setSuccess("Event added successfully!");
                setForm({
                    title: "",
                    description: "",
                    date: "",
                    venue: "",
                    chapter: "Main",
                });
                setImageFile(null);
                setImagePreview(null);
                setShowForm(false);
                fetchEvents();
            } else {
                setError(data.error || "Failed to add event");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDelete(id) {
        if (!confirm("Are you sure you want to delete this event?")) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setSuccess("Event deleted successfully!");
                fetchEvents();
            } else {
                setError(data.error || "Failed to delete event");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setDeletingId(null);
        }
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = events.filter(
        (e) => new Date(e.date) >= today
    );
    const pastEvents = events.filter(
        (e) => new Date(e.date) < today
    );

    const displayedEvents =
        activeTab === "upcoming" ? upcomingEvents : pastEvents;

    return (
        <div className={styles.container}>

            {/* TOP BAR */}
            <div className={styles.topBar}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === "upcoming" ? styles.activeTab : ""}`}
                        onClick={() => setActiveTab("upcoming")}
                    >
                        Upcoming ({upcomingEvents.length})
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === "past" ? styles.activeTab : ""}`}
                        onClick={() => setActiveTab("past")}
                    >
                        Past ({pastEvents.length})
                    </button>
                </div>
                <button
                    className={styles.addButton}
                    onClick={() => {
                        setShowForm(!showForm);
                        setError("");
                        setSuccess("");
                    }}
                >
                    {showForm ? "Cancel" : "+ Add Event"}
                </button>
            </div>

            {/* MESSAGES */}
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}

            {/* ADD EVENT FORM */}
            {showForm && (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h3 className={styles.formTitle}>New Event</h3>

                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label>Title</label>
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleFormChange}
                                placeholder="Event title"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Chapter</label>
                            <select
                                name="chapter"
                                value={form.chapter}
                                onChange={handleFormChange}
                            >
                                {CHAPTERS.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Date</label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleFormChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Venue</label>
                            <input
                                name="venue"
                                value={form.venue}
                                onChange={handleFormChange}
                                placeholder="Venue"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleFormChange}
                            placeholder="Event description"
                            rows={3}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className={styles.imagePreview}
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={submitting}
                    >
                        {submitting ? "Adding Event..." : "Add Event"}
                    </button>
                </form>
            )}

            {/* EVENTS LIST */}
            {loading ? (
                <p className={styles.loading}>Loading events...</p>
            ) : displayedEvents.length === 0 ? (
                <p className={styles.empty}>
                    No {activeTab} events found.
                </p>
            ) : (
                <div className={styles.eventsList}>
                    {displayedEvents.map((event) => (
                        <div key={event._id} className={styles.eventCard}>
                            <img
                                src={event.imageUrl}
                                alt={event.title}
                                className={styles.eventImage}
                            />
                            <div className={styles.eventInfo}>
                                <span className={styles.chapter}>
                                    {event.chapter}
                                </span>
                                <h4 className={styles.eventTitle}>
                                    {event.title}
                                </h4>
                                <p className={styles.eventMeta}>
                                    {new Date(event.date).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )}{" "}
                                    · {event.venue}
                                </p>
                                <p className={styles.eventDescription}>
                                    {event.description}
                                </p>
                            </div>
                            <button
                                className={styles.deleteButton}
                                onClick={() => handleDelete(event._id)}
                                disabled={deletingId === event._id}
                            >
                                {deletingId === event._id
                                    ? "Deleting..."
                                    : "Delete"}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
