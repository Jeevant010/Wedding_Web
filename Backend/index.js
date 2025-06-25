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
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wedding_services', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const weddingRoutes = require('./routes/weddings');
app.use('/api/weddings', weddingRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

