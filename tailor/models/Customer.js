const mongoose = require('mongoose');
const { applyToJSON } = require('../utils/toJSON');

const customerSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'TailorUser', required: true, index: true },
  name: { type: String, required: true, trim: true },
  phone: { type: String, default: null },
  address: { type: String, default: null },
  gender: { type: String, default: null },
  notes: { type: String, default: null },
  created_at: { type: String, required: true },
});

applyToJSON(customerSchema);

module.exports = mongoose.model('TailorCustomer', customerSchema);
