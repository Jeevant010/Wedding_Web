const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Get homepage data
router.get('/', homeController.getHomePage);

// In your HomePage.js routes file
router.get('/test', (req, res) => {
  res.json({ message: 'Homepage route is working!' });
});

// Update homepage data (you may want to protect this route with authentication)
router.put('/update', homeController.updateHomePage);

module.exports = router;