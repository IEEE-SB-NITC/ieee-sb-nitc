import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Store launch time in a JSON file in the project root (persists across restarts)
const DATA_FILE = path.join(process.cwd(), "launch-time.json");

function readLaunchTime() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return { launchTimeISO: null };
}

function writeLaunchTime(launchTimeISO) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ launchTimeISO }), "utf-8");
}

// GET /api/launch-time  — returns current launch time
export async function GET() {
  const data = readLaunchTime();
  return NextResponse.json(data);
}

// POST /api/launch-time  — body: { launchTimeISO: "<ISO string in IST>" }
export async function POST(request) {
  try {
    const body = await request.json();
    const { launchTimeISO } = body;

    // Allow explicit null to clear the launch time (disables countdown)
    if (launchTimeISO !== null) {
      if (!launchTimeISO) {
        return NextResponse.json(
          { error: "launchTimeISO is required (pass null to clear)" },
          { status: 400 }
        );
      }
      // Validate it's a valid date
      const date = new Date(launchTimeISO);
      if (isNaN(date.getTime())) {
        return NextResponse.json(
          { error: "Invalid date format" },
          { status: 400 }
        );
      }
    }

    writeLaunchTime(launchTimeISO);
    return NextResponse.json({ success: true, launchTimeISO });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
