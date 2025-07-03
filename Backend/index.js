// make any changes required to run the Featured wedding section
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors({
    origin : ['http://localhost:5173', 'https://wedding-web-gold.vercel.app'],
    methods : "GET,POST,PUT,DELETE",
    Credential: true
}));
app.use(express.json());

// Static file serving for media assets
app.use('/static', express.static('public'));

// MongoDB Connection
const MONGODB_URI = 'mongodb://localhost:27017/wedding_web';

// Connect to local MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const homePageRoutes = require('./routes/HomePage');
app.use('/api/home', homePageRoutes);
const weddingRoutes = require('./routes/weddings');
app.use('/api/weddings', weddingRoutes);
const weddingFilmRoutes = require('./routes/weddingFilms');
app.use('/api/wedding-films', weddingFilmRoutes);
const filmsRouter = require('./routes/films');
app.use('/api/films', filmsRouter);

// Data API Routes
const testimonialRoutes = require('./routes/testimonials');
app.use('/api/testimonials', testimonialRoutes);
const promotionRoutes = require('./routes/promotions');
app.use('/api/promotions', promotionRoutes);
const footerRoutes = require('./routes/footer');
app.use('/api/footer', footerRoutes);

app.use('/', (req, res) => {
    res.send("My server is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

