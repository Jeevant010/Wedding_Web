const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Route for search suggestions (autocomplete)
router.get('/suggestions', searchController.getSearchSuggestions);

// Route for full search results
router.get('/', searchController.searchServices);

// Route for search statistics (optional)
router.get('/stats', searchController.getSearchStats);

// Route to add sample data (development only)
router.post('/sample-data', searchController.addSampleData);

module.exports = router;
