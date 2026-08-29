const mongoose = require('mongoose');
const { applyToJSON } = require('../utils/toJSON');

const paymentSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'TailorUser', required: true, index: true },
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TailorOrder', required: true, index: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  note: { type: String, default: null },
});

applyToJSON(paymentSchema, { refs: ['order_id'] });

module.exports = mongoose.model('TailorPayment', paymentSchema);
