const express = require('express');
const router = express.Router();
const { getPromotionData, getPromotionById } = require('../controllers/promotionController');

// GET /api/promotions
router.get('/', getPromotionData);

// GET /api/promotions/:id
router.get('/:id', getPromotionById);

module.exports = router;
