const express = require('express');
const router = express.Router();
const filmPageData = require('../data/films');

//get all data
router.get('/portfolio', (req, res)=>{
  try{
    res.json(filmPageData);

  } catch(error){
    console.error('Error fetching portfolio data:', error);
    res.status(500).json({error:'Failed to fetch Portfolio data'});
  }
});

//get specific category
router.get('/portfolio/:categoryId', (req, res)=>{
  try{
    const category = filmPageData.categories.find(cat=> cat.id === req.params.categoryId);
    if(!category){
      return res.status(404).json({error: 'Category not found'});

    }
    res.json(category);

  } catch(error){
    console.error('Error fetching category data:', error);
    res.status(500).json({error:'Failed to fetch category data'});
  }
});
// Get specific film
router.get('/film/:filmId', (req, res) => {
  try {
    const filmId = parseInt(req.params.filmId);
    let film = null;
    
    for (const category of filmPageData.categories) {
      film = category.films.find(f => f.id === filmId);
      if (film) break;
    }
    
    if (!film) {
      return res.status(404).json({ error: 'Film not found' });
    }
    
    res.json(film);
  } catch (error) {
    console.error('Error fetching film data:', error);
    res.status(500).json({ error: 'Failed to fetch film data' });
  }
});

module.exports = router;