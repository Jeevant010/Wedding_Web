// Sample Data Initialization Script
// This script will initialize the database with sample wedding services for testing

const axios = require('axios');

// Function to initialize sample data
async function initializeSampleData() {
  console.log('Initializing sample data for wedding services...');
  
  try {
    // Make a request to the sample data endpoint
    const response = await axios.post('http://localhost:9000/api/search/sample-data');
    
    if (response.data.success) {
      console.log(`✅ Success! Added ${response.data.count} sample wedding services to the database.`);
    } else {
      console.error('❌ Failed to add sample data:', response.data);
    }
  } catch (error) {
    console.error('❌ Error initializing sample data:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the function
initializeSampleData();
