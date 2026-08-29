const Order = require('../models/Order');
const Payment = require('../models/Payment');
const Customer = require('../models/Customer');

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

async function summary(req, res, next) {
  try {
    const owner = req.userId;
    const today = todayIso();

    const [pendingCount, dueTodayCount, overdueCount, openOrders] = await Promise.all([
      Order.countDocuments({ owner, status: { $ne: 'delivered' } }),
      Order.countDocuments({ owner, status: { $ne: 'delivered' }, due_date: today }),
      Order.countDocuments({ owner, status: { $ne: 'delivered' }, due_date: { $ne: null, $lt: today } }),
      Order.find({ owner, status: { $ne: 'delivered' } }).select('_id total_amount'),
    ]);

    const orderIds = openOrders.map((o) => o._id);
    const paymentSums = await Payment.aggregate([
      { $match: { order_id: { $in: orderIds } } },
      { $group: { _id: '$order_id', paid: { $sum: '$amount' } } },
    ]);
    const paidByOrderId = new Map(paymentSums.map((p) => [p._id.toString(), p.paid]));
    const totalBalanceDue = openOrders.reduce((sum, o) => {
      const paid = paidByOrderId.get(o._id.toString()) ?? 0;
      return sum + (o.total_amount - paid);
    }, 0);

    res.json({ pendingCount, dueTodayCount, overdueCount, totalBalanceDue });
  } catch (err) {
    next(err);
  }
}

async function dueAndOverdue(req, res, next) {
  try {
    const owner = req.userId;
    const today = todayIso();
    const orders = await Order.find({
      owner,
      status: { $ne: 'delivered' },
      due_date: { $ne: null, $lte: today },
    }).sort({ due_date: 1 });

    if (orders.length === 0) return res.json([]);

    const customerIds = [...new Set(orders.map((o) => o.customer_id.toString()))];
    const orderIds = orders.map((o) => o._id);
    const [customers, paymentSums] = await Promise.all([
      Customer.find({ _id: { $in: customerIds }, owner }),
      Payment.aggregate([
        { $match: { order_id: { $in: orderIds } } },
        { $group: { _id: '$order_id', paid: { $sum: '$amount' } } },
      ]),
    ]);
    const customerById = new Map(customers.map((c) => [c._id.toString(), c]));
    const paidByOrderId = new Map(paymentSums.map((p) => [p._id.toString(), p.paid]));

    res.json(
      orders.map((o) => {
        const json = o.toJSON();
        const customer = customerById.get(o.customer_id.toString());
        json.customer_name = customer?.name ?? '';
        json.customer_phone = customer?.phone ?? null;
        json.paid_amount = paidByOrderId.get(o._id.toString()) ?? 0;
        return json;
      })
    );
  } catch (err) {
    next(err);
  }
}

module.exports = { summary, dueAndOverdue };
