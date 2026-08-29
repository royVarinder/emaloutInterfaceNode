const express = require('express');
const orders = require('../controllers/orders.controller');
const payments = require('../controllers/payments.controller');

const router = express.Router();

router.get('/', orders.list);
router.post('/', orders.create);
router.get('/:id', orders.getOne);
router.put('/:id', orders.update);
router.patch('/:id/status', orders.updateStatus);
router.delete('/:id', orders.remove);
router.get('/:orderId/payments', payments.listForOrder);

module.exports = router;
