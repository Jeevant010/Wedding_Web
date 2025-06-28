// write the routes fot the WeddingService model

// Delete wedding service route handler
// const deleteWeddingService = async (req, res) => {
//   try {
//     const deletedService = await WeddingService.findByIdAndDelete(req.params.id);
//     if (!deletedService) {
//       return res.status(404).json({ error: 'Wedding service not found' });
//     }
//     return res.json({ message: 'Wedding service deleted successfully' });
//   } catch (error) {
//     return handleError(res, error);
//   }
// }; 

const express = require('express');
const router = express.Router();
const {
    getAllServices,
    // getServiceById,
    // createService,
    // updateService,
    // deleteService,
    getFeaturedServices
} = require('../controllers/weddingController');

// Get all wedding services
router.get('/', getAllServices);

// IMPORTANT: Place specific routes before parameterized routes
router.get('/featured', getFeaturedServices);

// Routes with parameters
// router.get('/:id', getServiceById);
// router.post('/', createService);
// router.put('/:id', updateService);
// router.delete('/:id', deleteService);

module.exports = router;
