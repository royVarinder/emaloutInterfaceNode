
// models/User.js
const mongoose = require("mongoose");
const { Schema } = mongoose;


const newsSchema = new Schema({
    title: String,
    description: String,
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true
    },
    author_name: String,
    facebook_link: String,
    insta_link: String,
    youtube_link: String,
    files: Array,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    status: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("News", newsSchema);
