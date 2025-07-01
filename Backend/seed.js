const mongoose = require('mongoose');
const WeddingService = require('./models/WeddingService');
const WeddingFilm = require('./models/WeddingFilm');
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

const weddingFilms = [
  // Recents
  {
    couple: 'PV SINDHU & DATTA',
    date: 'DEC 2024',
    location: 'UDAIPUR',
    image: '/images/sample-wedding1.jpg',
    videoUrl: '/videos/wedding-1.mp4',
    category: 'Recents',
    featured: true,
    description: 'A beautiful traditional wedding in the royal city of Udaipur.',
    tags: ['traditional', 'royal', 'destination']
  },
  {
    couple: 'DHRISHA & ARUN',
    date: 'JUN 2024',
    location: 'BODRUM',
    image: '/images/sample-wedding2.jpg',
    videoUrl: '/videos/wedding-2.mp4',
    category: 'Recents',
    featured: true,
    description: 'An intimate beachside ceremony in beautiful Bodrum.',
    tags: ['beach', 'destination', 'intimate']
  },
  {
    couple: 'NIKKI & VISHAL',
    date: 'JUN 2024',
    location: 'LONDON',
    image: '/images/sample-wedding3.jpg',
    videoUrl: '/videos/wedding-3.mp4',
    category: 'Recents',
    featured: false,
    description: 'A elegant city wedding in the heart of London.',
    tags: ['city', 'elegant', 'modern']
  },
  {
    couple: 'RAVI & PRIYANKA',
    date: 'MAY 2024',
    location: 'JAIPUR',
    image: '/images/sample-wedding4.jpg',
    videoUrl: '',
    category: 'Recents',
    featured: false,
    description: 'Royal Rajasthani wedding in the Pink City.',
    tags: ['royal', 'traditional', 'colorful']
  },

  // Favourites
  {
    couple: 'ARJUN & PRIYA',
    date: 'MAR 2024',
    location: 'MUMBAI',
    image: '/images/sample-wedding1.jpg',
    videoUrl: '',
    category: 'Favourites',
    featured: true,
    description: 'A glamorous Mumbai wedding with stunning city views.',
    tags: ['glamorous', 'city', 'modern']
  },
  {
    couple: 'RAHUL & SNEHA',
    date: 'FEB 2024',
    location: 'DELHI',
    image: '/images/sample-wedding2.jpg',
    videoUrl: '',
    category: 'Favourites',
    featured: false,
    description: 'Traditional Delhi wedding with rich cultural elements.',
    tags: ['traditional', 'cultural', 'grand']
  },
  {
    couple: 'KARAN & ISHA',
    date: 'JAN 2024',
    location: 'JAIPUR',
    image: '/images/sample-wedding3.jpg',
    videoUrl: '',
    category: 'Favourites',
    featured: false,
    description: 'A fairy-tale wedding in a heritage palace.',
    tags: ['palace', 'heritage', 'royal']
  },
  {
    couple: 'AMIT & KAVYA',
    date: 'DEC 2023',
    location: 'KERALA',
    image: '/images/sample-wedding4.jpg',
    videoUrl: '',
    category: 'Favourites',
    featured: false,
    description: 'Beautiful backwater wedding in God\'s own country.',
    tags: ['backwaters', 'nature', 'serene']
  },

  // Classics
  {
    couple: 'VIKRAM & ANANYA',
    date: 'NOV 2023',
    location: 'RAJASTHAN',
    image: '/images/sample-wedding1.jpg',
    videoUrl: '',
    category: 'Classics',
    featured: false,
    description: 'Timeless Rajasthani wedding with traditional rituals.',
    tags: ['timeless', 'traditional', 'rituals']
  },
  {
    couple: 'DAVID & MARIA',
    date: 'OCT 2023',
    location: 'GOA',
    image: '/images/sample-wedding2.jpg',
    videoUrl: '',
    category: 'Classics',
    featured: false,
    description: 'Classic beach wedding with Portuguese influences.',
    tags: ['beach', 'classic', 'portuguese']
  },
  {
    couple: 'SANJAY & MEERA',
    date: 'SEP 2023',
    location: 'MYSORE',
    image: '/images/sample-wedding3.jpg',
    videoUrl: '',
    category: 'Classics',
    featured: false,
    description: 'South Indian classical wedding with rich traditions.',
    tags: ['south-indian', 'classical', 'traditions']
  },
  {
    couple: 'ROHAN & DIVYA',
    date: 'AUG 2023',
    location: 'SHIMLA',
    image: '/images/sample-wedding4.jpg',
    videoUrl: '',
    category: 'Classics',
    featured: false,
    description: 'Mountain wedding in the queen of hills.',
    tags: ['mountain', 'hills', 'scenic']
  },

  // Celebrities
  {
    couple: 'ACTOR ADITYA & ACTRESS SARA',
    date: 'JUL 2023',
    location: 'MUMBAI',
    image: '/images/sample-wedding1.jpg',
    videoUrl: '',
    category: 'Celebrities',
    featured: true,
    description: 'Star-studded Bollywood wedding extravaganza.',
    tags: ['bollywood', 'star-studded', 'extravaganza']
  },
  {
    couple: 'SINGER RAHUL & MODEL PRIYA',
    date: 'JUN 2023',
    location: 'DELHI',
    image: '/images/sample-wedding2.jpg',
    videoUrl: '',
    category: 'Celebrities',
    featured: false,
    description: 'Musical celebration with industry friends.',
    tags: ['musical', 'industry', 'celebration']
  },
  {
    couple: 'DIRECTOR KUMAR & WRITER ANJALI',
    date: 'MAY 2023',
    location: 'BANGALORE',
    image: '/images/sample-wedding3.jpg',
    videoUrl: '',
    category: 'Celebrities',
    featured: false,
    description: 'Creative minds unite in a beautiful ceremony.',
    tags: ['creative', 'artistic', 'unique']
  },
  {
    couple: 'CRICKETER VIK & INFLUENCER TANYA',
    date: 'APR 2023',
    location: 'HYDERABAD',
    image: '/images/sample-wedding4.jpg',
    videoUrl: '',
    category: 'Celebrities',
    featured: false,
    description: 'Sports meets social media in this modern wedding.',
    tags: ['sports', 'modern', 'social-media']
  },

  // International
  {
    couple: 'JEAN & MARIE',
    date: 'MAR 2023',
    location: 'PARIS',
    image: '/images/sample-wedding1.jpg',
    videoUrl: '',
    category: 'International',
    featured: false,
    description: 'Romantic Parisian wedding with Indian touches.',
    tags: ['paris', 'romantic', 'fusion']
  },
  {
    couple: 'JOHN & SARAH',
    date: 'FEB 2023',
    location: 'NEW YORK',
    image: '/images/sample-wedding2.jpg',
    videoUrl: '',
    category: 'International',
    featured: false,
    description: 'Urban chic wedding in the city that never sleeps.',
    tags: ['urban', 'chic', 'cosmopolitan']
  },
  {
    couple: 'HIROSHI & YUKI',
    date: 'JAN 2023',
    location: 'TOKYO',
    image: '/images/sample-wedding3.jpg',
    videoUrl: '',
    category: 'International',
    featured: false,
    description: 'Modern Japanese ceremony with traditional elements.',
    tags: ['japanese', 'modern', 'traditional']
  },
  {
    couple: 'MARCO & ELENA',
    date: 'DEC 2022',
    location: 'TUSCANY',
    image: '/images/sample-wedding4.jpg',
    videoUrl: '',
    category: 'International',
    featured: false,
    description: 'Vineyard wedding in the heart of Tuscany.',
    tags: ['vineyard', 'tuscany', 'romantic']
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await WeddingService.deleteMany({});
    await WeddingFilm.deleteMany({});
    
    // Insert new data
    await WeddingService.insertMany(sampleWeddings);
    await WeddingFilm.insertMany(weddingFilms);
    
    console.log('Database seeded successfully!');
    console.log(`Inserted ${sampleWeddings.length} wedding services`);
    console.log(`Inserted ${weddingFilms.length} wedding films`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();