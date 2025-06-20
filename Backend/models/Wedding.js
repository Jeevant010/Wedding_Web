// write the model for the Wedding schema
const mongoose = require("mongoose");

const weddingServiceSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        index: true // Index for faster searching
    },
    description: {
        type: String,
        required: true,
        index: true // Index for faster searching
    },
    category: {
        type: String,
        required: true,
        enum: ['venues', 'photographers', 'planners', 'decor', 'catering', 'other'],
        index: true // Index for category filtering
    },
    image: {
        type: String,
        default: '/placeholder.png'
    },
    location: {
        city: String,
        state: String,
        country: { type: String, default: 'USA' }
    },
    contactInfo: {
        email: String,
        phone: String,
        website: String
    },
    pricing: {
        startingPrice: Number,
        currency: { type: String, default: 'USD' }
    },
    rating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    featured: {
        type: Boolean,
        default: false
    },
    keywords: [String], // For better search matching
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const WeddingService = mongoose.model("WeddingService", weddingServiceSchema);
module.exports = WeddingService;
