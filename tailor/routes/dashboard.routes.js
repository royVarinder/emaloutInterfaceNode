const express = require('express');
const dashboard = require('../controllers/dashboard.controller');

const router = express.Router();

router.get('/summary', dashboard.summary);
router.get('/due', dashboard.dueAndOverdue);

module.exports = router;
