// write the controller for the WeddingService model
const WeddingService = require('../models/WeddingService');

// Get all wedding services
const getAllServices = async (req, res) => {
  try {
    const services = await WeddingService.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get featured wedding services
const getFeaturedServices = async (req, res) => {
  try {
    const featuredServices = await WeddingService.find({ featured: true });
    res.json(featuredServices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get wedding service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await WeddingService.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Wedding service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new wedding service
const createService = async (req, res) => {
  try {
    const newService = new WeddingService(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update wedding service
const updateService = async (req, res) => {
  try {
    const updatedService = await WeddingService.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedService) {
      return res.status(404).json({ error: 'Wedding service not found' });
    }
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete wedding service
const deleteService = async (req, res) => {
  try {
    const deletedService = await WeddingService.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ error: 'Wedding service not found' });
    }
    res.json({ message: 'Wedding service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getFeaturedServices
};


