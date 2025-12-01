// models/User.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminUsersSchema = new Schema({
    name : String,
    phone: String,
    email: String,
    password: String,
    status: {
        type: Number,
        default: 1
    },
    role: {
        type: String,
        default: null //admin, superadmin, channel, organization
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AdminUsers", adminUsersSchema);
