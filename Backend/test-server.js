const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Footer = require('./models/Footer');
const { MusicTrack, MusicDefaultTheme } = require('./models/Music');
const Testimonial = require('./models/Testimonial');
const Promotion = require('./models/Promotion');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/wedding_web')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Test endpoint for footer
app.get('/api/footer', async (req, res) => {
    try {
        const footerData = await Footer.findOne();
        
        if (!footerData) {
            return res.status(404).json({
                success: false,
                message: 'Footer data not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: footerData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching footer data',
            error: error.message
        });
    }
});

// Test endpoint for music
app.get('/api/music', async (req, res) => {
    try {
        const musicTracks = await MusicTrack.find();
        const defaultTheme = await MusicDefaultTheme.findOne();
        
        res.status(200).json({
            success: true,
            data: {
                tracks: musicTracks,
                defaultTheme: defaultTheme
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching music data',
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
    console.log('\nTesting API endpoints...');
    
    // Test footer API
    setTimeout(async () => {
        try {
            const footerResponse = await fetch(`http://localhost:${PORT}/api/footer`);
            const footerData = await footerResponse.json();
            console.log('\n📄 Footer API Test:');
            if (footerData.success) {
                console.log('✅ Footer API working');
                console.log('- Legal Links:', footerData.data.legalLinks?.length || 0);
                console.log('- Social Links:', footerData.data.socialLinks?.length || 0);
                console.log('- Copyright:', footerData.data.companyInfo?.copyright ? 'Found' : 'Missing');
            } else {
                console.log('❌ Footer API failed:', footerData.message);
            }
        } catch (error) {
            console.log('❌ Footer API error:', error.message);
        }
        
        // Test music API
        try {
            const musicResponse = await fetch(`http://localhost:${PORT}/api/music`);
            const musicData = await musicResponse.json();
            console.log('\n🎵 Music API Test:');
            if (musicData.success) {
                console.log('✅ Music API working');
                console.log('- Tracks:', musicData.data.tracks?.length || 0);
                console.log('- Default Theme:', musicData.data.defaultTheme ? 'Found' : 'Missing');
            } else {
                console.log('❌ Music API failed:', musicData.message);
            }
        } catch (error) {
            console.log('❌ Music API error:', error.message);
        }
    }, 1000);
});
