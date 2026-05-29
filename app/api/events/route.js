import connectDB from "@/lib/db";
import Event from "@/lib/models/Event";

export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type");

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let events;

        if (type === "upcoming") {
            events = await Event.find({ date: { $gte: today } }).sort({ date: 1 });
        } else if (type === "past") {
            events = await Event.find({ date: { $lt: today } }).sort({ date: -1 });
        } else {
            events = await Event.find().sort({ date: -1 });
        }

        return Response.json({ success: true, data: events });
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();
        const { title, description, date, venue, chapter, imageUrl, imagePublicId } = body;

        if (!title || !description || !date || !venue || !chapter || !imageUrl || !imagePublicId) {
            return Response.json(
                { success: false, error: "All fields are required" },
                { status: 400 }
            );
        }

        const event = await Event.create({
            title,
            description,
            date,
            venue,
            chapter,
            imageUrl,
            imagePublicId,
        });

        return Response.json({ success: true, data: event }, { status: 201 });
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}