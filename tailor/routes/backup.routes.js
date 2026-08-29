const express = require('express');
const backup = require('../controllers/backup.controller');

const router = express.Router();

router.get('/export', backup.exportBackup);
router.post('/import', backup.importBackup);

module.exports = router;
