const express = require('express');
const router = express.Router();
const films = require('../data/films');

// Get featured films (this should come BEFORE the /:id route)
router.get('/films/featured', (req, res) => {
  try {
    const featuredFilms = films.filter(film => film.featured);
    res.json(featuredFilms);
  } catch (error) {
    console.error('Error loading featured films:', error);
    res.status(500).json({ error: 'Failed to load featured films' });
  }
});

// Get all films
router.get('/films', (req, res) => {
  try {
    res.json(films);
  } catch (error) {
    console.error('Error loading films data:', error);
    res.status(500).json({ error: 'Failed to load films' });
  }
});

// Get film by ID (this should come AFTER specific routes)
router.get('/films/:id', (req, res) => {
  try {
    const filmId = parseInt(req.params.id);
    const film = films.find(f => f.id === filmId);
    
    if (!film) {
      return res.status(404).json({ error: 'Film not found' });
    }
    
    res.json(film);
  } catch (error) {
    console.error('Error loading film data:', error);
    res.status(500).json({ error: 'Failed to load film' });
  }
});

module.exports = router;