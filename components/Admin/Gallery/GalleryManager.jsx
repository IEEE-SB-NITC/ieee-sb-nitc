"use client";

import { useState, useEffect } from "react";

export default function GalleryManager() {
  const [eventName, setEventName] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [existingEvents, setExistingEvents] = useState([]);

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
    fetchEvents();
  }, []);

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
  
  

  return (
    <div>
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
  );
}
