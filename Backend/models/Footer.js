const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
    companyInfo: {
        name: String,
        tagline: String,
        copyright: String
    },
    contactInfo: {
        phone: String,
        email: String,
        address: {
            line1: String,
            line2: String,
            city: String
        }
    },
    socialLinks: [{
        name: String,
        url: String,
        icon: String
    }],
    legalLinks: [{
        name: String,
        url: String
    }]
}, {
    timestamps: true
});

const Footer = mongoose.model('Footer', footerSchema);

module.exports = Footer;
