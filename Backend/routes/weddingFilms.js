const express = require('express');
const router = express.Router();
const {
  getAllFilms,
  getFilmsByCategory,
  getFilmsByCategories,
  getFeaturedFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm
} = require('../controllers/weddingFilmController');

// Get all films
router.get('/', getAllFilms);

// Get all films grouped by categories
router.get('/categories', getFilmsByCategories);

// Get featured films
router.get('/featured', getFeaturedFilms);

// Get films by specific category
router.get('/category/:category', getFilmsByCategory);

// Get film by ID
router.get('/:id', getFilmById);

// Create new film
router.post('/', createFilm);

// Update film
router.put('/:id', updateFilm);

// Delete film
router.delete('/:id', deleteFilm);

module.exports = router;
