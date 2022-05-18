import mongoose from "mongoose";

const guild = new mongoose.Schema({
    guildId: {
        type: String,
        required: true
    },
    prefix: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    }
});

export default mongoose.model("guild", guild);