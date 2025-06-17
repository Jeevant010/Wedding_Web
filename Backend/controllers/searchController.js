const WeddingService = require('../models/WeddingService');

// Helper function to handle errors
const handleError = (res, error) => {
  console.error('Search error:', error);
  return res.status(500).json({ error: 'Server error processing your search' });
};

// Get search suggestions as user types
exports.getSearchSuggestions = async (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query || query.length < 2) {
      return res.json([]);
    }

    // Find services matching the query in title or description
    // Using case-insensitive regex for better matches
    const suggestions = await WeddingService.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { keywords: { $regex: query, $options: 'i' } }
      ]
    })
    .select('title category') // Only get needed fields for suggestions
    .limit(5); // Limit to 5 suggestions for performance

    // Format suggestions for frontend
    const formattedSuggestions = suggestions.map(service => ({
      id: service._id,
      text: service.title,
      category: service.category
    }));

    return res.json(formattedSuggestions);
  } catch (error) {
    return handleError(res, error);
  }
};

// Get full search results
exports.searchServices = async (req, res) => {
  try {
    const query = req.query.q;
    const category = req.query.category;
    
    if (!query) {
      return res.json([]);
    }

    // Build search criteria
    let searchCriteria = {};
    
    // Text search in multiple fields
    searchCriteria.$or = [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { keywords: { $regex: query, $options: 'i' } }
    ];
    
    // Filter by category if specified and not 'all'
    if (category && category !== 'all') {
      searchCriteria.category = category;
    }

    // Perform the search
    const results = await WeddingService.find(searchCriteria)
      .select('title description category image pricing.startingPrice rating')
      .sort({ featured: -1, 'rating.average': -1 }) // Sort by featured and rating
      .limit(20); // Limit results

    return res.json(results);
  } catch (error) {
    return handleError(res, error);
  }
};

// Get search statistics - useful for analytics
exports.getSearchStats = async (req, res) => {
  try {
    const topCategories = await WeddingService.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    return res.json({ 
      totalServices: await WeddingService.countDocuments(),
      topCategories
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// Add sample data for testing (development only)
exports.addSampleData = async (req, res) => {
  try {
    // Check for development environment
    if (process.env.NODE_ENV !== 'development') {
      return res.status(403).json({ error: 'This endpoint is only available in development mode' });
    }

    // Sample wedding services data
    const sampleData = [
      {
        title: 'Grand Royal Palace',
        description: 'A luxurious venue with magnificent gardens and spacious ballrooms perfect for your dream wedding.',
        category: 'venues',
        image: '/images/venues/royal-palace.jpg',
        location: { city: 'New York', state: 'NY' },
        contactInfo: { email: 'info@royalpalace.com', phone: '212-555-0123' },
        pricing: { startingPrice: 5000 },
        rating: { average: 4.8, count: 156 },
        featured: true,
        keywords: ['luxury venue', 'ballroom', 'garden', 'elegant', 'palace']
      },
      {
        title: 'Elena Davis Photography',
        description: 'Award-winning wedding photographer capturing your special moments with a creative and artistic style.',
        category: 'photographers',
        image: '/images/photographers/elena-davis.jpg',
        location: { city: 'Los Angeles', state: 'CA' },
        contactInfo: { email: 'elena@davisphoto.com', phone: '310-555-0189' },
        pricing: { startingPrice: 2500 },
        rating: { average: 4.9, count: 211 },
        featured: true,
        keywords: ['photographer', 'photography', 'artistic', 'creative']
      },
      {
        title: 'Perfect Day Planners',
        description: 'Full-service wedding planning team specializing in luxury weddings and destination events.',
        category: 'planners',
        image: '/images/planners/perfect-day.jpg',
        location: { city: 'Chicago', state: 'IL' },
        contactInfo: { email: 'info@perfectdayplanners.com', phone: '312-555-0214' },
        pricing: { startingPrice: 3500 },
        rating: { average: 4.7, count: 89 },
        featured: false,
        keywords: ['wedding planner', 'luxury', 'destination', 'coordinator']
      },
      {
        title: 'Floral Dreams Decor',
        description: 'Turn your wedding venue into a fairytale setting with our exquisite floral arrangements and decor.',
        category: 'decor',
        image: '/images/decor/floral-dreams.jpg',
        location: { city: 'Miami', state: 'FL' },
        contactInfo: { email: 'hello@floraldreams.com', phone: '305-555-0173' },
        pricing: { startingPrice: 1800 },
        rating: { average: 4.6, count: 124 },
        featured: false,
        keywords: ['flowers', 'floral', 'decor', 'decoration', 'centerpiece']
      },
      {
        title: 'Sunset Beach Resort',
        description: 'Beautiful beachfront venue for your perfect destination wedding with stunning sunset views.',
        category: 'venues',
        image: '/images/venues/sunset-beach.jpg',
        location: { city: 'San Diego', state: 'CA' },
        contactInfo: { email: 'weddings@sunsetbeach.com', phone: '619-555-0183' },
        pricing: { startingPrice: 6500 },
        rating: { average: 4.5, count: 78 },
        featured: true,
        keywords: ['beach', 'destination', 'resort', 'oceanfront', 'sunset']
      }
    ];

    // Delete existing sample data
    await WeddingService.deleteMany({});
    
    // Insert new sample data
    await WeddingService.insertMany(sampleData);

    return res.json({
      success: true,
      message: 'Sample data added successfully',
      count: sampleData.length
    });
  } catch (error) {
    return handleError(res, error);
  }
};
