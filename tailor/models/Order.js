const mongoose = require('mongoose');
const { applyToJSON } = require('../utils/toJSON');
const { ORDER_STATUSES } = require('../constants');

const orderSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'TailorUser', required: true, index: true },
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TailorCustomer', required: true, index: true },
  garment_type: { type: String, required: true },
  measurement_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TailorMeasurement', default: null },
  description: { type: String, default: null },
  status: { type: String, enum: ORDER_STATUSES, default: 'new' },
  order_date: { type: String, required: true },
  due_date: { type: String, default: null },
  delivered_date: { type: String, default: null },
  total_amount: { type: Number, default: 0 },
  notes: { type: String, default: null },
  created_at: { type: String, required: true },
});

applyToJSON(orderSchema, { refs: ['customer_id', 'measurement_id'] });

module.exports = mongoose.model('TailorOrder', orderSchema);
