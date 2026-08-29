const mongoose = require('mongoose');
const { applyToJSON } = require('../utils/toJSON');

const settingsSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'TailorUser', required: true, unique: true },
  shopName: { type: String, default: '' },
  shopPhone: { type: String, default: '' },
  shopAddress: { type: String, default: '' },
});

applyToJSON(settingsSchema);

module.exports = mongoose.model('TailorSettings', settingsSchema);
