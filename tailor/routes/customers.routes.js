const express = require('express');
const customers = require('../controllers/customers.controller');
const measurements = require('../controllers/measurements.controller');
const orders = require('../controllers/orders.controller');

const router = express.Router();

router.get('/', customers.list);
router.post('/', customers.create);
router.get('/:id', customers.getOne);
router.put('/:id', customers.update);
router.delete('/:id', customers.remove);
router.get('/:customerId/measurements', measurements.listForCustomer);
router.get('/:customerId/orders', orders.listForCustomer);

module.exports = router;
