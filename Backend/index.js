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

// MongoDB Connection
const MONGODB_URI = `mongodb+srv://Deepesh:${process.env.MONGO_PASSWORD}@cluster0.4l8pl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Atlas connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const homePageRoutes = require('./routes/HomePage');
app.use('/api/home', homePageRoutes);
const weddingRoutes = require('./routes/weddings');
app.use('/api/weddings', weddingRoutes);

app.use('/', (req, res) => {
    res.send("My server is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

