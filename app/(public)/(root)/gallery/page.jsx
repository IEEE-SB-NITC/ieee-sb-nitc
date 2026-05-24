"use client";

import { useState, useEffect } from "react";

export default function GalleryPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      try {
        // Force the browser and Next.js to ignore cached copies entirely on refresh
        const res = await fetch(`/api/gallery?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        });
        
        if (res.ok) {
          const data = await res.json();
          setEvents(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Failed to load gallery entries:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto", color: "#fff", minHeight: "100vh" }}>
      
      {/* Header */}
      <header style={{ marginBottom: "5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Our Event Gallery</h1>
        <p style={{ color: "#aaa" }}>Take a look at memories from our past events and initiatives</p>
      </header>

      {loading ? (
        <p style={{ textAlign: "center", color: "#aaa" }}>Loading gallery memories...</p>
      ) : events.length === 0 ? (
        <p style={{ textAlign: "center", color: "#aaa" }}>No events uploaded yet.</p>
      ) : (
        /* Events Grid Wrapper */
        <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
          {events.map((event) => (
            <div key={event.id || Math.random()} style={{ borderBottom: "1px solid #222", paddingBottom: "4rem" }}>
              <h2 style={{ fontSize: "1.75rem", marginBottom: "2rem", color: "#e2e8f0", textTransform: "capitalize" }}>
                {event.name}
              </h2>
              
              {/* Images layout container */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
                gap: "2rem" 
              }}>
                {event.images && event.images.map((imgUrl, index) => (
                  <div key={index} style={{ overflow: "hidden", borderRadius: "8px", aspectRatio: "4/3", backgroundColor: "#222" }}>
                    <img 
                      src={imgUrl} 
                      alt={`${event.name} photo ${index + 1}`} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}