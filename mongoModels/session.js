// models/Blacklist.js
const mongoose = require("mongoose");


const sessionSchema = new mongoose.Schema({
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "AdminUsers", required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: false },
    token: { type: String, required: true },
    expiredAt: { type: Date, required: true }
});

module.exports = mongoose.model("Session", sessionSchema);
