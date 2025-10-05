
// models/User.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const businessSchema = new Schema({
    name: String,
    buss_name : {
        type: String,
        required: true
    }, 
    buss_contact : {
        type: String,
        required: true
    },
    description : String,
    email: {
        type: String,
        required: true
    },
    phone: String,
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    website: String,
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    days: String,
    features: String,
    //STORE IN JSON FORMAT
    images: {
        type: Array,
        default: []
    },
    status: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Business", businessSchema);