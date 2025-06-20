// write the controller for the WeddingService model
const WeddingService = require('../models/WeddingService');
const mogose = require('mongoose');

// Helper function to handle errors
const handleError = (res, error) => {
  console.error('Wedding Service error:', error);
  return res.status(500).json({ error: 'Server error processing your request' });
}

// Get all wedding services
exports.getAllServices = async (req, res) => {
  try {
    const services = await WeddingService.find().sort({ createdAt: -1 });
    return res.json(services);
  } catch (error) {
    return handleError(res, error);
  }
}
// Get a single wedding service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await WeddingService.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Wedding service not found' });
    }
    return res.json(service);
  } catch (error) {
    return handleError(res, error);
  }
}
// Create a new wedding service
exports.createService = async (req, res) => {
  try {
    const newService = new WeddingService(req.body);
    await newService.save();
    return res.status(201).json(newService);
  } catch (error) {
    return handleError(res, error);
  }
}
// Update an existing wedding service
exports.updateService = async (req, res) => {
  try {
    const updatedService = await WeddingService.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedService) {
      return res.status(404).json({ error: 'Wedding service not found' });
    }
    return res.json(updatedService);
  } catch (error) {
    return handleError(res, error);
  }
}   
// Delete a wedding service
exports.deleteService = async (req, res) => {
  try {
    const deletedService = await WeddingService.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ error: 'Wedding service not found' });
    }
    return res.json({ message: 'Wedding service deleted successfully' });
  } catch (error) {
    return handleError(res, error);
  }
}
// Search for wedding services by title or keywords
exports.searchServices = async (req, res) => {      
  try {
    const query = req.query.q;
    if (!query) {
      return res.json([]);
    }

    // Using case-insensitive regex for better matches
    const services = await WeddingService.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { keywords: { $regex: query, $options: 'i' } }
      ]
    })
    .select('title category image pricing.startingPrice rating')
    .limit(20); // Limit results for performance

    return res.json(services);
  } catch (error) {
    return handleError(res, error);
  }
}
// Get featured wedding services
exports.getFeaturedServices = async (req, res) => {
  try {
    const featuredServices = await WeddingService.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(10); // Limit to 10 featured services
    return res.json(featuredServices);
  } catch (error) {
    return handleError(res, error);
  }
}
// Get services by category
exports.getServicesByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }

    const services = await WeddingService.find({ category })
      .sort({ createdAt: -1 })
      .limit(20); // Limit results for performance

    return res.json(services);
  } catch (error) {
    return handleError(res, error);
  }
}


    