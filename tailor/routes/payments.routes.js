const express = require('express');
const payments = require('../controllers/payments.controller');

const router = express.Router();

router.post('/', payments.create);
router.delete('/:id', payments.remove);

module.exports = router;
