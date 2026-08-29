const Settings = require('../models/Settings');

async function get(req, res, next) {
  try {
    let settings = await Settings.findOne({ owner: req.userId });
    if (!settings) {
      settings = await Settings.create({ owner: req.userId, shopName: '', shopPhone: '', shopAddress: '' });
    }
    res.json(settings.toJSON());
  } catch (err) {
    next(err);
  }
}

async function save(req, res, next) {
  try {
    const { shopName, shopPhone, shopAddress } = req.body;
    const settings = await Settings.findOneAndUpdate(
      { owner: req.userId },
      { shopName: shopName ?? '', shopPhone: shopPhone ?? '', shopAddress: shopAddress ?? '' },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(settings.toJSON());
  } catch (err) {
    next(err);
  }
}

module.exports = { get, save };
