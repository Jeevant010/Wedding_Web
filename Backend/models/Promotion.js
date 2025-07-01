const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    promotionId: {
        type: Number,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    bgGradient: {
        type: String,
        required: true
    },
    textColor: {
        type: String,
        required: true
    },
    categoryColor: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
