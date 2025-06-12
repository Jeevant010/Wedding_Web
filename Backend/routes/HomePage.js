const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Get homepage data
router.get('/', homeController.getHomePage);


// Update homepage data
router.put('/update', homeController.updateHomePage);

module.exports = router;