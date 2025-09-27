// models/Blacklist.js
const mongoose = require("mongoose");


const sessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    token: { type: String, required: true },
    expiredAt: { type: Date, required: true }
});

module.exports = mongoose.model("Session", sessionSchema);
