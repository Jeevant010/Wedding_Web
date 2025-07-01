const mongoose = require('mongoose');
const { MusicTrack, MusicDefaultTheme } = require('./models/Music');
const Footer = require('./models/Footer');
const Testimonial = require('./models/Testimonial');
const Promotion = require('./models/Promotion');
require('dotenv').config();

const MONGODB_URI = `mongodb+srv://Deepesh:${process.env.MONGO_PASSWORD}@cluster0.4l8pl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

async function checkDatabase() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        
        const musicCount = await MusicTrack.countDocuments();
        const themeCount = await MusicDefaultTheme.countDocuments();
        const footerCount = await Footer.countDocuments();
        const testimonialCount = await Testimonial.countDocuments();
        const promotionCount = await Promotion.countDocuments();
        
        console.log('Database Status:');
        console.log(`- Music Tracks: ${musicCount}`);
        console.log(`- Default Themes: ${themeCount}`);
        console.log(`- Footer Records: ${footerCount}`);
        console.log(`- Testimonials: ${testimonialCount}`);
        console.log(`- Promotions: ${promotionCount}`);
        
        if (musicCount > 0) {
            const sampleTrack = await MusicTrack.findOne();
            console.log('Sample track:', sampleTrack.title);
        }
        
        process.exit(0);
    } catch (error) {
        console.error('Database check error:', error.message);
        process.exit(1);
    }
}

checkDatabase();
