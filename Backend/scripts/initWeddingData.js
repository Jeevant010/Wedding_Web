// write the code intialize wedding data
const axios = require('axios');
const fs = require('fs');   
const path = require('path');
const WeddingService = require('../models/WeddingService');
const { sampleWeddingServices } = require('./sampleData');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');
// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => {
  console.log('Connected to MongoDB');
  initWeddingData();
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
// Function to initialize wedding data
async function initWeddingData() {
    try {
        // Check if the collection is empty
        const count = await WeddingService.countDocuments();
        if (count > 0) {
        console.log('Wedding services already exist in the database.');
        return;
        }
    
        // Insert sample wedding services
        const result = await WeddingService.insertMany(sampleWeddingServices);
        console.log(`✅ Successfully added ${result.length} wedding services to the database.`);
    } catch (error) {
        console.error('❌ Error initializing wedding data:', error.message);
    } finally {
        mongoose.connection.close();
    }
    }
// Run the initialization function
initWeddingData().catch((error) => {
    console.error('❌ Error during initialization:', error.message);
    mongoose.connection.close();
}
);
// Export the function for testing purposes
module.exports = initWeddingData;