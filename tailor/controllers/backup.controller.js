const Customer = require('../models/Customer');
const Measurement = require('../models/Measurement');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const Settings = require('../models/Settings');

async function exportBackup(req, res, next) {
  try {
    const owner = req.userId;
    const [customers, measurements, orders, payments, settings] = await Promise.all([
      Customer.find({ owner }),
      Measurement.find({ owner }),
      Order.find({ owner }),
      Payment.find({ owner }),
      Settings.findOne({ owner }),
    ]);

    res.json({
      version: 1,
      exportedAt: new Date().toISOString(),
      customers: customers.map((c) => c.toJSON()),
      measurements: measurements.map((m) => m.toJSON()),
      orders: orders.map((o) => o.toJSON()),
      payments: payments.map((p) => p.toJSON()),
      settings: settings ? settings.toJSON() : null,
    });
  } catch (err) {
    next(err);
  }
}

// Not wrapped in a MongoDB transaction: a plain standalone/local MongoDB instance
// (no replica set) doesn't support multi-document transactions.
async function importBackup(req, res, next) {
  try {
    const owner = req.userId;
    const { customers = [], measurements = [], orders = [], payments = [], settings } = req.body;

    await Payment.deleteMany({ owner });
    await Order.deleteMany({ owner });
    await Measurement.deleteMany({ owner });
    await Customer.deleteMany({ owner });

    const customerIdMap = new Map();
    for (const c of customers) {
      const created = await Customer.create({
        owner,
        name: c.name,
        phone: c.phone,
        address: c.address,
        gender: c.gender,
        notes: c.notes,
        created_at: c.created_at,
      });
      customerIdMap.set(c.id, created._id);
    }

    const measurementIdMap = new Map();
    for (const m of measurements) {
      const customerId = customerIdMap.get(m.customer_id);
      if (!customerId) continue;
      const created = await Measurement.create({
        owner,
        customer_id: customerId,
        garment_type: m.garment_type,
        values_json: m.values_json,
        notes: m.notes,
        updated_at: m.updated_at,
      });
      measurementIdMap.set(m.id, created._id);
    }

    const orderIdMap = new Map();
    for (const o of orders) {
      const customerId = customerIdMap.get(o.customer_id);
      if (!customerId) continue;
      const created = await Order.create({
        owner,
        customer_id: customerId,
        garment_type: o.garment_type,
        measurement_id: o.measurement_id ? measurementIdMap.get(o.measurement_id) ?? null : null,
        description: o.description,
        status: o.status,
        order_date: o.order_date,
        due_date: o.due_date,
        delivered_date: o.delivered_date,
        total_amount: o.total_amount,
        notes: o.notes,
        created_at: o.created_at,
      });
      orderIdMap.set(o.id, created._id);
    }

    for (const p of payments) {
      const orderId = orderIdMap.get(p.order_id);
      if (!orderId) continue;
      await Payment.create({ owner, order_id: orderId, amount: p.amount, date: p.date, note: p.note });
    }

    if (settings) {
      await Settings.findOneAndUpdate(
        { owner },
        { shopName: settings.shopName ?? '', shopPhone: settings.shopPhone ?? '', shopAddress: settings.shopAddress ?? '' },
        { upsert: true }
      );
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = { exportBackup, importBackup };
