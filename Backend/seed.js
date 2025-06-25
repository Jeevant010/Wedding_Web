const mongoose = require('mongoose');
const WeddingService = require('./models/WeddingService');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wedding_services', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => console.error('MongoDB connection error:', err));

const sampleWeddings = [
  {
    title: 'Lara & Michael',
    description: 'A beautiful beach wedding in Malibu',
    image: '/images/sample-wedding1.jpg',
    featured: true,
    category: 'Beach Wedding'  // Added required category field
  },
  {
    title: 'Priya & Rahul',
    description: 'Traditional ceremony with modern reception',
    image: '/images/sample-wedding2.jpg',
    featured: true,
    category: 'Traditional Wedding'  // Added required category field
  },
  {
    title: 'Emma & James',
    description: 'Intimate garden wedding in spring',
    image: '/images/sample-wedding3.jpg',
    featured: true,
    category: 'Garden Wedding'  // Added required category field
  },
  {
    title: 'Alex & Jordan',
    description: 'Urban rooftop celebration',
    image: '/images/sample-wedding4.jpg',
    featured: false,
    category: 'Urban Wedding'  // Added required category field
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