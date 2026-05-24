"use client";

import { useState } from "react";

// Temporary mockup data to see how the events will render visually
const mockEvents = [
  {
    id: 1,
    name: "Tathva '26 Inauguration",
    images: ["https://picsum.photos/400/300?random=1", "https://picsum.photos/400/300?random=2"]
  },
  {
    id: 2,
    name: "Robotics Workshop",
    images: ["https://picsum.photos/400/300?random=3", "https://picsum.photos/400/300?random=4"]
  }
];

export default function GalleryPage() {
  const [events, setEvents] = useState(mockEvents);

 return (
    <div style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto", color: "#fff" }}>
      
      {/* Header */}
      <header style={{ marginBottom: "5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Our Event Gallery</h1>
        <p style={{ color: "#aaa" }}>Take a look at memories from our past events and initiatives</p>
      </header>

      {/* Events Grid Wrapper - Increased gap to 8rem for a bigger visual break */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8rem" }}>
        {events.map((event) => (
          <div key={event.id} style={{ borderBottom: "1px solid #222", paddingBottom: "4rem" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "2rem", color: "#e2e8f0" }}>{event.name}</h2>
            
            {/* Images layout container */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
              gap: "2rem" 
            }}>
              {event.images.map((imgUrl, index) => (
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
    </div>
 )
}