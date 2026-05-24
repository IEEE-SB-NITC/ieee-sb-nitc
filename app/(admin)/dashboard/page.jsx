"use client";

import { useState } from "react";
import styles from "./dashboard.module.css";

const sections = ["Events", "Legacies", "Gallery", "Blog"];

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("Events");
  const [eventName, setEventName] = useState("");
  const [selectedImages, setSelectedImages] = useState(null);

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    
    if (!eventName || !selectedImages || selectedImages.length === 0) {
      alert("Please provide an event name and select at least one image.");
      return;
    }

    // Pack text inputs and files securely into standard FormData
    const formData = new FormData();
    formData.append("eventName", eventName);
    
    Array.from(selectedImages).forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Gallery event uploaded successfully!");
        // Reset state values to clear the text and file inputs smoothly
        setEventName("");
        setSelectedImages(null);
        e.target.reset();
      } else {
        alert(`Upload failed: ${data.error || "Unknown backend error"}`);
      }
    } catch (error) {
      console.error("Network error during upload:", error);
      alert("Network error: Could not reach the upload server.");
    }
  };

  return (
    <div className={styles.container}>

      {/* ================= HEADER ================= */}
      <div className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <p className={styles.subtitle}>
          Manage platform content efficiently
        </p>
      </div>


      {/* ================= SECTION SELECTOR ================= */}
      <div className={styles.selectorContainer}>
        {sections.map((section) => (
          <button
            key={section}
            className={`${styles.selectorButton} ${
              activeSection === section ? styles.activeButton : ""
            }`}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </button>
        ))}
      </div>


      {/* ================= ACTIVE CONTENT ================= */}
      <div className={styles.contentArea}>

        {activeSection === "Events" && (
          <section className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2>Events Management</h2>
            </div>

            <p className={styles.description}>
              Add, edit, delete, and manage upcoming events.
            </p>

            <div className={styles.workspace}>
              Event management workspace
            </div>
          </section>
        )}


        {activeSection === "Legacies" && (
          <section className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2>Legacies Management</h2>
            </div>

            <p className={styles.description}>
              Maintain achievements, milestones, and legacy content.
            </p>

            <div className={styles.workspace}>
              Legacies management workspace
            </div>
          </section>
        )}


        {activeSection === "Gallery" && (
          <section className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2>Gallery Management</h2>
            </div>

            <p className={styles.description}>
              Upload and manage public gallery images.
            </p>

            <div className={styles.workspace}>
              <form onSubmit={handleGallerySubmit} className={styles.galleryForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="eventName">Event Name</label>
                  <input
                    type="text"
                    id="eventName"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="e.g. Tathva '26 Inauguration"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="imageUpload">Select Images</label>
                  <input
                    type="file"
                    id="imageUpload"
                    multiple
                    accept="image/*"
                    onChange={(e) => setSelectedImages(e.target.files)}
                    required
                  />
                </div>

                <button type="submit" className={styles.uploadButton}>
                  Upload Gallery Event
                </button>
              </form>
            </div>
          </section>
        )}


        {activeSection === "Blog" && (
          <section className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2>Blog Management</h2>
            </div>

            <p className={styles.description}>
              Create, edit, and publish blog articles.
            </p>

            <div className={styles.workspace}>
              Blog management workspace
            </div>
          </section>
        )}

      </div>
    </div>
  );
}