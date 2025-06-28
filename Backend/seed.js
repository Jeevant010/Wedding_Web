const mongoose = require('mongoose');
const WeddingService = require('./models/WeddingService');
require('dotenv').config();

// Use the same connection string as in index.js
const MONGODB_URI = `mongodb+srv://Deepesh:${process.env.MONGO_PASSWORD}@cluster0.4l8pl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Atlas connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

const sampleWeddings = [
  {
    title: 'L & Michael',
    description: 'A beautiful beach wedding in Malibu',
    image: '/images/sample-wedding1.jpg',
    featured: true,
    category: 'Beach Wedding'
  },
  {
    title: 'Priya & Rahul',
    description: 'Traditional ceremony with modern reception',
    image: '/images/sample-wedding2.jpg',
    featured: true,
    category: 'Traditional Wedding'
  },
  {
    title: 'Emma & James',
    description: 'Intimate garden wedding in spring',
    image: '/images/sample-wedding3.jpg',
    featured: true,
    category: 'Garden Wedding'
  },
  {
    title: 'Alex & Jordan',
    description: 'Urban rooftop celebration',
    image: '/images/sample-wedding4.jpg',
    featured: false, // Change to true if you want it displayed
    category: 'Urban Wedding'
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await WeddingService.deleteMany({});
    
    // Insert new data
    await WeddingService.insertMany(sampleWeddings);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();