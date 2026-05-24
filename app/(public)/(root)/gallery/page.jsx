"use client";

import { useState, useEffect } from "react";

export default function GalleryPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      try {
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
    <div style={{ 
      backgroundColor: "#000000", 
      minHeight: "100vh", 
      color: "#fff", 
      fontFamily: "sans-serif",
      position: "relative",
      overflowX: "hidden"
    }}>
      
      {/* NATIVE FIGMA PNG BACKGROUND OVERLAY */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "600px",
        backgroundImage: "url('/images/gallery-bg.png')", // Points directly to your PNG asset
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        /* Seamlessly bleeds the asset down into the pure black void */
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0) 100%)",
        zIndex: 0,
        pointerEvents: "none"
      }} />

      {/* Transparent Content Header Overlay */}
      <div style={{
        position: "relative",
        zIndex: 1,
        padding: "9rem 2rem 5rem 2rem",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "3.5rem", fontWeight: "700", letterSpacing: "-0.04em", marginBottom: "0.75rem" }}>
          Gallery
        </h1>
        <p style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: "300", opacity: 0.85 }}>
          A Glimpse into Our Journey
        </p>
      </div>

      {/* Main Content: Normal Image Grid */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 4rem 6rem 4rem", maxWidth: "1200px", margin: "0 auto" }}>
        {loading ? (
          <p style={{ textAlign: "center", color: "#a1a1aa", fontSize: "1rem", marginTop: "4rem" }}>
            Loading gallery memories...
          </p>
        ) : events.length === 0 ? (
          <p style={{ textAlign: "center", color: "#71717a", fontStyle: "italic", marginTop: "4rem" }}>
            No events uploaded yet.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
            {events.map((event) => (
              <div key={event.id || Math.random()}>
                
                {/* Clean Section Header Category Mapping */}
                <h2 style={{ 
                  fontSize: "1.85rem", 
                  fontWeight: "700", 
                  color: "#ffffff", 
                  marginBottom: "2.5rem", 
                  textTransform: "capitalize",
                  letterSpacing: "-0.02em"
                }}>
                  {event.name}
                </h2>
                
                {/* STANDARD UNIFORM IMAGE GRID */}
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
                  gap: "1.5rem" 
                }}>
                  {event.images && event.images.map((imgUrl, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        overflow: "hidden", 
                        borderRadius: "8px", 
                        backgroundColor: "#0d0614",
                        aspectRatio: "4/3",
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                        transition: "transform 0.2s ease"
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <img 
                        src={imgUrl} 
                        alt={`${event.name} photo asset ${idx + 1}`} 
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
    </div>
  );
}