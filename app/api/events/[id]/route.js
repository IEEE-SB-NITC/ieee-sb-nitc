import connectDB from "@/lib/db";
import Event from "@/lib/models/Event";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        const event = await Event.findById(id);

        if (!event) {
            return Response.json(
                { success: false, error: "Event not found" },
                { status: 404 }
            );
        }

        await cloudinary.uploader.destroy(event.imagePublicId);

        await Event.findByIdAndDelete(id);

        return Response.json({ success: true, message: "Event deleted successfully" });
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}