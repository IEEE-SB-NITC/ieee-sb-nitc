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
      <form
        onSubmit={handleUpload}
        className="border border-dashed border-slate-300 p-6 sm:p-8 rounded-lg bg-slate-50 mb-10"
      >
        <div className="w-full max-w-md mb-5">
          <label className="block text-sm font-semibold mb-1.5">Event Name</label>
          <input
            type="text"
            placeholder="e.g. Tathva '26 Inauguration"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-7">
          <label className="block text-sm font-semibold mb-1.5">Select Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="text-sm text-slate-600"
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-900 text-white px-5 py-2 rounded-md text-sm font-semibold cursor-pointer transition-opacity w-full sm:w-auto"
          style={{ opacity: uploading ? 0.6 : 1 }}
        >
          {uploading ? "Uploading..." : "Upload Gallery Event"}
        </button>
      </form>

      <h3 className="text-xl font-bold border-t border-slate-200 pt-7 mb-4">
        Existing Image Collections
      </h3>
      {existingEvents.length === 0 ? (
        <p className="text-slate-400 text-sm italic">No active image collections found.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {existingEvents.map((event) => (
            <div
              key={event.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5 bg-slate-50 rounded-lg border border-slate-200"
            >
              <div>
                <h4 className="font-semibold text-base text-slate-900 capitalize">{event.name}</h4>
                <p className="text-sm text-slate-500 mt-0.5">{event.images?.length || 0} image(s) hosted in collection</p>
              </div>
              <button
                onClick={() => handleDelete(event.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold cursor-pointer w-full sm:w-auto text-center"
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
