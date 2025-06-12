const mongoose = require('mongoose');

const homePageSchema = new mongoose.Schema({
  heroSection: {
    title: { type: String, default: "The Wedding Story" },
    subtitle: { type: String, default: "Capturing Your Beautiful Moments" },
    backgroundImage: { type: String, default: "/images/hero-background.jpg" }
  },
  featuredWeddings: [{
    title: String,
    coupleNames: String,
    location: String,
    date: Date,
    thumbnailImage: String,
    slug: String
  }],
  aboutSection: {
    title: String,
    description: String,
    image: String
  },
  testimonialSection: [{
    quote: String,
    author: String,
    weddingDate: Date,
    image: String
  }],
  contactInfo: {
    email: String,
    phone: String,
    instagram: String,
    facebook: String
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('HomePage', homePageSchema);