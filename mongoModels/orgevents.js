
// models/User.js
const mongoose = require("mongoose");
const { Schema } = mongoose;


const organizationEventsSchema = new Schema({
    event_name: String,
    event_description: String,
    event_date: String,
    event_location: String,
    event_image: String,
    event_type: String,
    guest_list: Array,
    event_time: String,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    status: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("OrganizationEvents", organizationEventsSchema);
