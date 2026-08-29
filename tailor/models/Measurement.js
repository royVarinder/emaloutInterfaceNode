const mongoose = require('mongoose');
const { applyToJSON } = require('../utils/toJSON');

const measurementSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'TailorUser', required: true, index: true },
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TailorCustomer', required: true, index: true },
  garment_type: { type: String, required: true },
  values_json: { type: String, required: true },
  notes: { type: String, default: null },
  updated_at: { type: String, required: true },
});

applyToJSON(measurementSchema, { refs: ['customer_id'] });

module.exports = mongoose.model('TailorMeasurement', measurementSchema);
