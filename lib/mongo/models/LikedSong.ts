import mongoose, { Schema } from "mongoose";

const LikedSongSchema = new mongoose.Schema({
    user_id: [{
        type: Schema.Types.ObjectId,
        ref: "User"
     }],
    song_id: [{
       type: Schema.Types.ObjectId,
       ref: "Song"
    }]
}, {timestamps: true});


export default mongoose.models.LikedSong || mongoose.model("LikedSong", LikedSongSchema)