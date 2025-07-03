const mongoose = require('mongoose');

const weddingFilmSchema = new mongoose.Schema({
  couple: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    enum: ['Recents', 'Favourites', 'Classics', 'Celebrities', 'International']
  },
  featured: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: ''
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
weddingFilmSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const WeddingFilm = mongoose.model('WeddingFilm', weddingFilmSchema);

module.exports = WeddingFilm;
