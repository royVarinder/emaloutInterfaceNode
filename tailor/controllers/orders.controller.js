const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Payment = require('../models/Payment');

async function withCustomerAndPaid(orders, ownerId) {
  if (orders.length === 0) return [];
  const customerIds = [...new Set(orders.map((o) => o.customer_id.toString()))];
  const orderIds = orders.map((o) => o._id);

  const [customers, paymentSums] = await Promise.all([
    Customer.find({ _id: { $in: customerIds }, owner: ownerId }),
    Payment.aggregate([
      { $match: { order_id: { $in: orderIds } } },
      { $group: { _id: '$order_id', paid: { $sum: '$amount' } } },
    ]),
  ]);

  const customerById = new Map(customers.map((c) => [c._id.toString(), c]));
  const paidByOrderId = new Map(paymentSums.map((p) => [p._id.toString(), p.paid]));

  return orders.map((o) => {
    const json = o.toJSON();
    const customer = customerById.get(o.customer_id.toString());
    json.customer_name = customer?.name ?? '';
    json.customer_phone = customer?.phone ?? null;
    json.paid_amount = paidByOrderId.get(o._id.toString()) ?? 0;
    return json;
  });
}

async function list(req, res, next) {
  try {
    const { status } = req.query;
    const query = { owner: req.userId };
    if (status) query.status = status;
    const orders = await Order.find(query).sort({ due_date: 1, created_at: -1 });
    res.json(await withCustomerAndPaid(orders, req.userId));
  } catch (err) {
    next(err);
  }
}

async function listForCustomer(req, res, next) {
  try {
    const orders = await Order.find({ customer_id: req.params.customerId, owner: req.userId }).sort({
      created_at: -1,
    });
    res.json(await withCustomerAndPaid(orders, req.userId));
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const order = await Order.findOne({ _id: req.params.id, owner: req.userId });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    const [withJoins] = await withCustomerAndPaid([order], req.userId);
    res.json(withJoins);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const {
      customer_id,
      garment_type,
      measurement_id,
      description,
      status,
      order_date,
      due_date,
      delivered_date,
      total_amount,
      notes,
    } = req.body;
    if (!customer_id || !garment_type || !order_date) {
      return res.status(400).json({ error: 'customer_id, garment_type and order_date are required' });
    }
    const order = await Order.create({
      owner: req.userId,
      customer_id,
      garment_type,
      measurement_id: measurement_id || null,
      description: description || null,
      status: status || 'new',
      order_date,
      due_date: due_date || null,
      delivered_date: delivered_date || null,
      total_amount: Number(total_amount) || 0,
      notes: notes || null,
      created_at: new Date().toISOString(),
    });
    const [withJoins] = await withCustomerAndPaid([order], req.userId);
    res.status(201).json(withJoins);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const {
      customer_id,
      garment_type,
      measurement_id,
      description,
      status,
      order_date,
      due_date,
      delivered_date,
      total_amount,
      notes,
    } = req.body;
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      {
        customer_id,
        garment_type,
        measurement_id: measurement_id || null,
        description: description || null,
        status,
        order_date,
        due_date: due_date || null,
        delivered_date: delivered_date || null,
        total_amount: Number(total_amount) || 0,
        notes: notes || null,
      },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    const [withJoins] = await withCustomerAndPaid([order], req.userId);
    res.json(withJoins);
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    const { status } = req.body;
    const existing = await Order.findOne({ _id: req.params.id, owner: req.userId });
    if (!existing) return res.status(404).json({ error: 'Order not found' });

    existing.status = status;
    if (status === 'delivered') {
      existing.delivered_date = new Date().toISOString();
    }
    await existing.save();
    const [withJoins] = await withCustomerAndPaid([existing], req.userId);
    res.json(withJoins);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const order = await Order.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    await Payment.deleteMany({ order_id: order._id, owner: req.userId });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = { list, listForCustomer, getOne, create, update, updateStatus, remove };
