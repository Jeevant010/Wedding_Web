const express = require('express');
const router = express.Router();
const { getTestimonials, getTestimonialById } = require('../controllers/testimonialController');

// GET /api/testimonials
router.get('/', getTestimonials);

// GET /api/testimonials/:id
router.get('/:id', getTestimonialById);

module.exports = router;
