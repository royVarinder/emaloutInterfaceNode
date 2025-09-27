// models/User.js
const mongoose = require("mongoose");
const { Schema } = mongoose;


const organizationSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  country: String,
  website: String,
  password: String,
  logo: String,
  description: String,
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Virtual field: events
organizationSchema.virtual("events", {
  ref: "OrganizationEvents",               // The model to use
  localField: "_id",          // Find events where `organization`
  foreignField: "organization" // matches `_id` of organization
});

// Ensure virtuals are included in JSON response
organizationSchema.set("toObject", { virtuals: true });
organizationSchema.set("toJSON", { virtuals: true });


module.exports = mongoose.model("Organization", organizationSchema);
