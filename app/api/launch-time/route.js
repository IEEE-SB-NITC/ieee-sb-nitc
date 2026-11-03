import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Setting from "@/lib/models/Setting";

const LAUNCH_KEY = "launchTimeISO";

// GET /api/launch-time  — returns current launch time
export async function GET() {
  try {
    await connectDB();
    const doc = await Setting.findOne({ key: LAUNCH_KEY });
    return NextResponse.json({ launchTimeISO: doc?.value ?? null });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/launch-time  — body: { launchTimeISO: "<ISO string>" | null }
export async function POST(request) {
  try {
    const body = await request.json();
    const { launchTimeISO } = body;

    // Allow explicit null to clear (disables countdown)
    if (launchTimeISO !== null && launchTimeISO !== undefined) {
      if (typeof launchTimeISO !== "string") {
        return NextResponse.json(
          { error: "launchTimeISO must be an ISO string or null" },
          { status: 400 }
        );
      }
      const date = new Date(launchTimeISO);
      if (isNaN(date.getTime())) {
        return NextResponse.json(
          { error: "Invalid date format" },
          { status: 400 }
        );
      }
    }

    await connectDB();
    await Setting.findOneAndUpdate(
      { key: LAUNCH_KEY },
      { key: LAUNCH_KEY, value: launchTimeISO ?? null },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, launchTimeISO: launchTimeISO ?? null });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
