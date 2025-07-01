const express = require('express');
const router = express.Router();
const { getFooterData } = require('../controllers/footerController');

// GET /api/footer
router.get('/', getFooterData);

module.exports = router;
