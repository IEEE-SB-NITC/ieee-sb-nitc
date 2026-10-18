"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default marker icon paths broken by Webpack/Next.js bundling
const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const NITC_POSITION = [11.3199672, 75.9326771];

export default function DynamicMap() {
  return (
    <MapContainer
      center={NITC_POSITION}
      zoom={16}
      style={{ width: "100%", height: "100%", borderRadius: "12px" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={NITC_POSITION} icon={markerIcon}>
        <Popup>
          <strong>IEEE SB NITC</strong>
          <br />
          NIT Calicut, Kozhikode, Kerala
        </Popup>
      </Marker>
    </MapContainer>
  );
}
