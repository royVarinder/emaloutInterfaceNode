const Customer = require('../models/Customer');
const Measurement = require('../models/Measurement');
const Order = require('../models/Order');
const Payment = require('../models/Payment');

async function list(req, res, next) {
  try {
    const { search } = req.query;
    const query = { owner: req.userId };
    if (search && search.trim()) {
      const re = new RegExp(search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      query.$or = [{ name: re }, { phone: re }];
    }
    const customers = await Customer.find(query).collation({ locale: 'en', strength: 2 }).sort({ name: 1 });
    res.json(customers.map((c) => c.toJSON()));
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const customer = await Customer.findOne({ _id: req.params.id, owner: req.userId });
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer.toJSON());
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { name, phone, address, gender, notes } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ error: 'name is required' });
    const customer = await Customer.create({
      owner: req.userId,
      name: name.trim(),
      phone: phone || null,
      address: address || null,
      gender: gender || null,
      notes: notes || null,
      created_at: new Date().toISOString(),
    });
    res.status(201).json(customer.toJSON());
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { name, phone, address, gender, notes } = req.body;
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { name, phone: phone || null, address: address || null, gender: gender || null, notes: notes || null },
      { new: true, runValidators: true }
    );
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer.toJSON());
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const customer = await Customer.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    const orders = await Order.find({ customer_id: customer._id, owner: req.userId }).select('_id');
    const orderIds = orders.map((o) => o._id);
    await Payment.deleteMany({ order_id: { $in: orderIds }, owner: req.userId });
    await Order.deleteMany({ customer_id: customer._id, owner: req.userId });
    await Measurement.deleteMany({ customer_id: customer._id, owner: req.userId });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getOne, create, update, remove };
