import connectDB from "@/lib/db";
import Event from "@/lib/models/Event";
import { auth } from "@/lib/auth"
import { createAdminClient } from "@/lib/supabase"

export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type");
        const societyId = searchParams.get("society_id");

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const query = {};

        if (societyId) {
        
            const supabase = createAdminClient()
        
            const { data: society, error: societyError } = await supabase
                .from("societies")
                .select("slug")
                .eq("id", societyId)
                .single();

            if (societyError) {
                throw new Error(societyError.message);
            }

            const chapter = society?.slug;
            query.chapter = chapter;
        }

        if (type === "upcoming") {
            query.date = { $gte: today };
        } else if (type === "past") {
            query.date = { $lt: today };
        }

        const sortOrder =
            type === "upcoming"
                ? { date: 1 }
                : { date: -1 };

        const events = await Event.find(query).sort(sortOrder);

        return Response.json({ success: true, data: events });
    } catch (error) {
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
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
        
        const session = await auth()
        if (!session?.user?.role) {
            return Response.json({ error: "Unauthorized" }, { status: 401 })
        }
        
        const callerRole = session.user.role
        if (["society_admin", "society_member"].includes(callerRole)){
        
            const supabase = createAdminClient()
        
            const { data: society, error: societyError } = await supabase
                .from("societies")
                .select("slug")
                .eq("id", session.user.societyId)
                .single();
        
            if (societyError) {
                throw new Error(societyError.message);
            }
            
            const userChapter = society?.slug;
        
            if(chapter !== userChapter){
                return Response.json({ error: "Cannot create events for other societies" }, { status: 403 })
            }
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
