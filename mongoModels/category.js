// models/User.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
    icon: String,
    name: String,
    description: String,
    status: {
        type: Number,
        default: 1
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


categorySchema.virtual("business", {
    ref: "Business",
    localField: "_id",
    foreignField: "category_id"
});

categorySchema.set("toJSON", { virtuals: true });
categorySchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Category", categorySchema);
