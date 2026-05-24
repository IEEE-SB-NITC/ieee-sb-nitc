import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Configure Cloudinary with environment credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const DB_FILE_PATH = path.join(process.cwd(), "public", "gallery-db.json");

function readDatabase() {
  try {
    if (!fs.existsSync(DB_FILE_PATH)) return [];
    const data = fs.readFileSync(DB_FILE_PATH, "utf8");
    return JSON.parse(data || "[]");
  } catch (error) {
    return [];
  }
}

function writeDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Database write error:", error);
  }
}

// GET: Fetch all saved entries for the gallery frontend page
export async function GET() {
  const data = readDatabase();
  return NextResponse.json(data);
}

// POST: Handle direct images upload stream to Cloudinary
export async function POST(request) {
  try {
    const formData = await request.formData();
    // Supporting both 'eventName' and 'name' to keep it entirely safe
    const eventName = formData.get("eventName") || formData.get("name");
    const files = formData.getAll("images");

    if (!eventName || files.length === 0) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const uploadedImageUrls = [];

    for (const file of files) {
      if (file.size === 0) continue;

      const fileBuffer = await file.arrayBuffer();
      const mimeType = file.type;
      const base64Data = Buffer.from(fileBuffer).toString("base64");
      const fileUri = `data:${mimeType};base64,${base64Data}`;

      const uploadResult = await cloudinary.uploader.upload(fileUri, {
        folder: "ieee-gallery",
        resource_type: "auto",
      });

      uploadedImageUrls.push(uploadResult.secure_url);
    }

    const currentDb = readDatabase();
    const newEventEntry = {
      // CRITICAL FIX: Save ID explicitly as a String to match our URL search params perfectly
      id: Date.now().toString(),
      name: eventName,
      images: uploadedImageUrls,
    };

    currentDb.unshift(newEventEntry);
    writeDatabase(currentDb);

    return NextResponse.json({ success: true, entry: newEventEntry });
  } catch (error) {
    console.error("Cloudinary route crashed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Handle removal of an event collection by ID string
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
    }

    const galleryData = readDatabase();

    // CRITICAL FIX: Double checking equality by converting both values to strings
    const updatedData = galleryData.filter((event) => event.id.toString() !== id.toString());

    writeDatabase(updatedData);

    return NextResponse.json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}