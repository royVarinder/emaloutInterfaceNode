const mongoose = require('mongoose');
const { applyToJSON } = require('../utils/toJSON');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, lowercase: true },
  passwordHash: { type: String, required: true },
  shopName: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

applyToJSON(userSchema, { hide: ['passwordHash'] });

module.exports = mongoose.model('TailorUser', userSchema);
