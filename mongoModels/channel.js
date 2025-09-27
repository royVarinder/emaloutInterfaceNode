
// models/User.js
const mongoose = require("mongoose");
const { Schema } = mongoose;


const channelSchema = new Schema({
    name: String,
    description: String,
    email: String,
    logo: String,
    address: String,
    phone: String,
    password: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    status: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Channel", channelSchema);
