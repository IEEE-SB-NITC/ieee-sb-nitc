import connectDB from "@/lib/db";
import Event from "@/lib/models/Event";
import cloudinary from "@/lib/cloudinary";
import { auth } from "@/lib/auth"
import { createAdminClient } from "@/lib/supabase"

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        
        const session = await auth()
        if (!session?.user?.role) {
            return Response.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params;

        const event = await Event.findById(id);

        if (!event) {
            return Response.json(
                { success: false, error: "Event not found" },
                { status: 404 }
            );
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
        
            if(event.chapter !== userChapter){
                return Response.json({ error: "Cannot delete events for other societies" }, { status: 403 })
            }
        }

        await cloudinary.uploader.destroy(event.imagePublicId);

        await Event.findByIdAndDelete(id);

        return Response.json({ success: true, message: "Event deleted successfully" });
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
