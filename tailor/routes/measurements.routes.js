const express = require('express');
const measurements = require('../controllers/measurements.controller');

const router = express.Router();

router.post('/', measurements.create);
router.get('/:id', measurements.getOne);
router.put('/:id', measurements.update);
router.delete('/:id', measurements.remove);

module.exports = router;
