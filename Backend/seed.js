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
    date: '01/01/2021',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80',
    featured: true,
    category: 'Beach Wedding'
  },
  {
    title: 'Priya & Rahul',
    date: '15/08/2021',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80',
    featured: true,
    category: 'Traditional Wedding'
  },
  {
    title: 'Emma & James',
    date: '24/09/2021',
    image: 'https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?q=80',
    featured: true,
    category: 'Garden Wedding'
  },
  {
    title: 'L & Michael',
    date: '01/01/2021',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80',
    featured: true,
    category: 'Beach Wedding'
  },
  {
    title: 'Priya & Rahul',
    date: '15/08/2021',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80',
    featured: true,
    category: 'Traditional Wedding'
  },
  
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