const WeddingFilm = require('../models/WeddingFilm');

// Get all wedding films
const getAllFilms = async (req, res) => {
  try {
    const films = await WeddingFilm.find().sort({ createdAt: -1 });
    res.json(films);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get films by category
const getFilmsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const films = await WeddingFilm.find({ category }).sort({ createdAt: -1 });
    res.json(films);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all films grouped by category
const getFilmsByCategories = async (req, res) => {
  try {
    const categories = ['Recents', 'Favourites', 'Classics', 'Celebrities', 'International'];
    const filmsByCategory = {};
    
    for (const category of categories) {
      const films = await WeddingFilm.find({ category }).sort({ createdAt: -1 });
      filmsByCategory[category] = films;
    }
    
    res.json(filmsByCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get featured films
const getFeaturedFilms = async (req, res) => {
  try {
    const featuredFilms = await WeddingFilm.find({ featured: true }).sort({ createdAt: -1 });
    res.json(featuredFilms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get film by ID
const getFilmById = async (req, res) => {
  try {
    const film = await WeddingFilm.findById(req.params.id);
    if (!film) {
      return res.status(404).json({ error: 'Wedding film not found' });
    }
    res.json(film);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new wedding film
const createFilm = async (req, res) => {
  try {
    const newFilm = new WeddingFilm(req.body);
    const savedFilm = await newFilm.save();
    res.status(201).json(savedFilm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update wedding film
const updateFilm = async (req, res) => {
  try {
    const updatedFilm = await WeddingFilm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedFilm) {
      return res.status(404).json({ error: 'Wedding film not found' });
    }
    res.json(updatedFilm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete wedding film
const deleteFilm = async (req, res) => {
  try {
    const deletedFilm = await WeddingFilm.findByIdAndDelete(req.params.id);
    if (!deletedFilm) {
      return res.status(404).json({ error: 'Wedding film not found' });
    }
    res.json({ message: 'Wedding film deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllFilms,
  getFilmsByCategory,
  getFilmsByCategories,
  getFeaturedFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm
};
