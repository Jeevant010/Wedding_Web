const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    testimonialId: {
        type: Number,
        required: true,
        unique: true
    },
    quote: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
