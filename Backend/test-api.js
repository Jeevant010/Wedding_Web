const mongoose = require('mongoose');
const Footer = require('./models/Footer');
const { MusicTrack, MusicDefaultTheme } = require('./models/Music');
const Testimonial = require('./models/Testimonial');
const Promotion = require('./models/Promotion');

async function testDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/wedding_web');
        console.log('✅ Connected to MongoDB');

        // Test Footer data
        const footerData = await Footer.findOne();
        console.log('\n📄 Footer Data:');
        if (footerData) {
            console.log('✅ Footer found');
            console.log('Full footer data:', JSON.stringify(footerData, null, 2));
            console.log('- Company Info:', footerData.companyInfo?.name || 'Missing');
            console.log('- Legal Links:', footerData.legalLinks?.length || 0, 'items');
            console.log('- Social Links:', footerData.socialLinks?.length || 0, 'items');
            console.log('- Copyright:', footerData.companyInfo?.copyright || 'Missing');
        } else {
            console.log('❌ No footer data found');
        }

        // Test Music data
        const musicData = await MusicTrack.find();
        const themeData = await MusicDefaultTheme.find();
        console.log('\n🎵 Music Data:');
        console.log('✅ Found', musicData.length, 'music tracks');
        console.log('✅ Found', themeData.length, 'default themes');

        // Test Testimonial data
        const testimonialData = await Testimonial.find();
        console.log('\n💬 Testimonial Data:');
        console.log('✅ Found', testimonialData.length, 'testimonials');

        // Test Promotion data
        const promotionData = await Promotion.find();
        console.log('\n🎯 Promotion Data:');
        console.log('✅ Found', promotionData.length, 'promotions');

        console.log('\n✅ All tests completed successfully!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('Stack:', error.stack);
    } finally {
        await mongoose.connection.close();
        console.log('🔒 Database connection closed');
    }
}

testDatabase();
