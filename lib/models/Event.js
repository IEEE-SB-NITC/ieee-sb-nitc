import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        venue: {
            type: String,
            required: true,
        },
        chapter: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        imagePublicId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Event = mongoose.models.Event || new mongoose.model("Event", EventSchema);

export default Event;