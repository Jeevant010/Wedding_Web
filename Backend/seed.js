const mongoose = require('mongoose');
const WeddingService = require('./models/WeddingService');
const WeddingFilm = require('./models/WeddingFilm');
const Footer = require('./models/Footer');
const Testimonial = require('./models/Testimonial');
const Promotion = require('./models/Promotion');

// Import data from data files
const { sampleWeddings } = require('./data/weddingServicesData');
const { weddingFilms } = require('./data/weddingFilmsData');
const { footerData } = require('./data/footerData');
const { testimonials } = require('./data/testimonialData');
const { promotionData } = require('./data/promotionData');

require('dotenv').config();

// Database connection
const MONGODB_URI = `mongodb+srv://Deepesh:${process.env.MONGO_PASSWORD}@cluster0.4l8pl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // Clear existing data
    console.log('Clearing existing data...');
    await WeddingService.deleteMany({});
    await WeddingFilm.deleteMany({});
    await Footer.deleteMany({});
    await Testimonial.deleteMany({});
    await Promotion.deleteMany({});
    console.log('✅ Existing data cleared');
    
    // Insert wedding services data
    console.log('Inserting wedding services...');
    await WeddingService.insertMany(sampleWeddings);
    console.log(`✅ Inserted ${sampleWeddings.length} wedding services`);
    
    // Insert wedding films data
    console.log('Inserting wedding films...');
    await WeddingFilm.insertMany(weddingFilms);
    console.log(`✅ Inserted ${weddingFilms.length} wedding films`);
    
    // Insert footer data
    console.log('Inserting footer data...');
    await Footer.create({
      companyInfo: {
        name: footerData.companyInfo.name,
        tagline: footerData.companyInfo.tagline,
        copyright: footerData.companyInfo.copyright
      },
      contactInfo: footerData.contactInfo,
      socialLinks: footerData.socialLinks.map(link => ({
        name: link.name,
        url: link.url,
        icon: link.icon
      })),
      legalLinks: footerData.legalLinks
    });
    console.log('✅ Inserted footer data');
    
    // Insert testimonials data
    console.log('Inserting testimonials...');
    const testimonialsWithId = testimonials.map((testimonial, index) => ({
      ...testimonial,
      testimonialId: testimonial.id,
      _id: undefined // Let MongoDB generate the _id
    }));
    await Testimonial.insertMany(testimonialsWithId);
    console.log(`✅ Inserted ${testimonials.length} testimonials`);
    
    // Insert promotions data
    console.log('Inserting promotions...');
    const promotionsWithId = promotionData.map((promotion, index) => ({
      ...promotion,
      promotionId: promotion.id,
      _id: undefined // Let MongoDB generate the _id
    }));
    await Promotion.insertMany(promotionsWithId);
    console.log(`✅ Inserted ${promotionData.length} promotions`);
    
    console.log('\n🎉 Database seeded successfully!');
    console.log('Summary:');
    console.log(`- Wedding Services: ${sampleWeddings.length}`);
    console.log(`- Wedding Films: ${weddingFilms.length}`);
    console.log(`- Footer Data: 1`);
    console.log(`- Testimonials: ${testimonials.length}`);
    console.log(`- Promotions: ${promotionData.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();