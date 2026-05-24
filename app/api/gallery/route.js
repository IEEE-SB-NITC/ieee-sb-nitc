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
    const eventName = formData.get("eventName");
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
      id: Date.now(),
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