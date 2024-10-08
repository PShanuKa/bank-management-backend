import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
    {
        location: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    }
)

const location = mongoose.model("location", locationSchema);

export default location;