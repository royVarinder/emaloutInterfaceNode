const Payment = require('../models/Payment');

async function listForOrder(req, res, next) {
  try {
    const payments = await Payment.find({ order_id: req.params.orderId, owner: req.userId }).sort({ date: -1 });
    res.json(payments.map((p) => p.toJSON()));
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { order_id, amount, date, note } = req.body;
    if (!order_id || !amount || !date) {
      return res.status(400).json({ error: 'order_id, amount and date are required' });
    }
    const payment = await Payment.create({
      owner: req.userId,
      order_id,
      amount: Number(amount),
      date,
      note: note || null,
    });
    res.status(201).json(payment.toJSON());
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const payment = await Payment.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = { listForOrder, create, remove };
