"use client";

import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("gallery"); // Defaulting to gallery for easy testing
  const [eventName, setEventName] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [existingEvents, setExistingEvents] = useState([]);

  // Fetch collections from local JSON storage
  const fetchEvents = async () => {
    try {
      const res = await fetch(`/api/gallery?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        setExistingEvents(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    if (activeTab === "gallery") {
      fetchEvents();
    }
  }, [activeTab]);

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!eventName || images.length === 0) {
      alert("Please enter an event name and select images.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("name", eventName);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Gallery event uploaded successfully!");
        setEventName("");
        setImages([]);
        e.target.reset();
        fetchEvents();
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this entire event collection?")) return;

    try {
      const res = await fetch(`/api/gallery?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Event collection deleted successfully!");
        fetchEvents();
      } else {
        alert("Failed to delete event.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Base layout Tab Button styles
  const tabBtnStyle = (tabName) => ({
    padding: "0.5rem 1.25rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "0.9rem",
    fontWeight: "500",
    cursor: "pointer",
    backgroundColor: activeTab === tabName ? "#1e293b" : "#f3f4f6",
    color: activeTab === tabName ? "#fff" : "#4b5563",
    transition: "0.2s"
  });

  return (
    <div style={{ padding: "3rem 2rem", backgroundColor: "#f8fafc", minHeight: "100vh", color: "#1e293b", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2.25rem", fontWeight: "700", marginBottom: "0.5rem" }}>Admin Dashboard</h1>
      <p style={{ color: "#64748b", fontSize: "0.95rem", marginBottom: "2rem" }}>Manage platform content efficiently.</p>

      {/* Tabs Row matching original image */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem" }}>
        <button onClick={() => setActiveTab("events")} style={tabBtnStyle("events")}>Events</button>
        <button onClick={() => setActiveTab("legacies")} style={tabBtnStyle("legacies")}>Legacies</button>
        <button onClick={() => setActiveTab("gallery")} style={tabBtnStyle("gallery")}>Gallery</button>
        <button onClick={() => setActiveTab("blog")} style={tabBtnStyle("blog")}>Blog</button>
      </div>

      {/* Main Content Pane */}
      <div style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "2.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        
        {activeTab === "events" && (
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.5rem" }}>Events Management</h2>
            <p style={{ color: "#64748b", fontSize: "0.875rem" }}>Add, edit, delete, and manage upcoming events.</p>
          </div>
        )}

        {activeTab === "legacies" && (
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.5rem" }}>Legacies Management</h2>
            <p style={{ color: "#64748b", fontSize: "0.875rem" }}>Manage platform historical highlights and records.</p>
          </div>
        )}

        {activeTab === "blog" && (
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.5rem" }}>Blog Management</h2>
            <p style={{ color: "#64748b", fontSize: "0.875rem" }}>Draft, publish, and structure public blog articles.</p>
          </div>
        )}

        {activeTab === "gallery" && (
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.25rem" }}>Gallery Management</h2>
            <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "2rem" }}>Upload and manage public gallery images.</p>

            {/* Form layout wrapper box matching dashboard aesthetic */}
            <form onSubmit={handleUpload} style={{ border: "1px dashed #cbd5e1", padding: "2rem", borderRadius: "8px", backgroundColor: "#f8fafc", marginBottom: "3rem" }}>
              <div style={{ maxWidth: "450px", marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem" }}>Event Name</label>
                <input
                  type="text"
                  placeholder="e.g. Tathva '26 Inauguration"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  style={{ width: "100%", padding: "0.6rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                />
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem" }}>Select Images</label>
                <input type="file" multiple accept="image/*" onChange={handleFileChange} style={{ fontSize: "0.9rem", color: "#475569" }} />
              </div>

              <button
                type="submit"
                disabled={uploading}
                style={{ backgroundColor: "#1e3a8a", color: "#fff", padding: "0.6rem 1.25rem", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "0.9rem", fontWeight: "600", opacity: uploading ? 0.6 : 1 }}
              >
                {uploading ? "Uploading..." : "Upload Gallery Event"}
              </button>
            </form>

            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", borderTop: "1px solid #e2e8f0", paddingTop: "2rem", marginBottom: "1rem" }}>Existing Image Collections</h3>
            {existingEvents.length === 0 ? (
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", fontStyle: "italic" }}>No active image collections found.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {existingEvents.map((event) => (
                  <div key={event.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    <div>
                      <h4 style={{ fontWeight: "600", fontSize: "1rem", color: "#0f172a", textTransform: "capitalize" }}>{event.name}</h4>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.25rem" }}>{event.images?.length || 0} image(s) hosted in collection</p>
                    </div>
                    <button
                      onClick={() => handleDelete(event.id)}
                      style={{ backgroundColor: "#ef4444", color: "#fff", padding: "0.5rem 1rem", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: "600" }}
                    >
                      Delete Collection
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}