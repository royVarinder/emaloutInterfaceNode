// models/User.js
const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new Schema({
  name: String,
  phone: String,
  status: { type: Number, default: 1 },
  role: { type: String, default: 'basic' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Users", userSchema);
