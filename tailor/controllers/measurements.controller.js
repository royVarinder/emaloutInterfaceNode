const Measurement = require('../models/Measurement');

async function listForCustomer(req, res, next) {
  try {
    const measurements = await Measurement.find({ customer_id: req.params.customerId, owner: req.userId }).sort({
      updated_at: -1,
    });
    res.json(measurements.map((m) => m.toJSON()));
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const measurement = await Measurement.findOne({ _id: req.params.id, owner: req.userId });
    if (!measurement) return res.status(404).json({ error: 'Measurement not found' });
    res.json(measurement.toJSON());
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { customer_id, garment_type, values_json, notes } = req.body;
    if (!customer_id || !garment_type || !values_json) {
      return res.status(400).json({ error: 'customer_id, garment_type and values_json are required' });
    }
    const measurement = await Measurement.create({
      owner: req.userId,
      customer_id,
      garment_type,
      values_json,
      notes: notes || null,
      updated_at: new Date().toISOString(),
    });
    res.status(201).json(measurement.toJSON());
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { garment_type, values_json, notes } = req.body;
    const measurement = await Measurement.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { garment_type, values_json, notes: notes || null, updated_at: new Date().toISOString() },
      { new: true, runValidators: true }
    );
    if (!measurement) return res.status(404).json({ error: 'Measurement not found' });
    res.json(measurement.toJSON());
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const measurement = await Measurement.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!measurement) return res.status(404).json({ error: 'Measurement not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = { listForCustomer, getOne, create, update, remove };
