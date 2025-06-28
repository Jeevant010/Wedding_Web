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
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80',
    featured: true,
    category: 'Beach Wedding'
  },
  {
    title: 'Priya & Rahul',
    description: 'Traditional ceremony with modern reception',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80',
    featured: true,
    category: 'Traditional Wedding'
  },
  {
    title: 'Emma & James',
    description: 'Intimate garden wedding in spring',
    image: 'https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?q=80',
    featured: true,
    category: 'Garden Wedding'
  },
  {
    title: 'Alex & Jordan',
    description: 'Urban rooftop celebration',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80',
    featured: false,
    category: 'Urban Wedding'
  }
  ,
  {
    title: 'L & Michael',
    description: 'A beautiful beach wedding in Malibu',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80',
    featured: true,
    category: 'Beach Wedding'
  },
  {
    title: 'Priya & Rahul',
    description: 'Traditional ceremony with modern reception',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80',
    featured: true,
    category: 'Traditional Wedding'
  },
  {
    title: 'Emma & James',
    description: 'Intimate garden wedding in spring',
    image: 'https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?q=80',
    featured: true,
    category: 'Garden Wedding'
  },
  {
    title: 'Alex & Jordan',
    description: 'Urban rooftop celebration',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80',
    featured: false,
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