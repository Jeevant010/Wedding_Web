const Promotion = require('../models/Promotion');

// Get all promotion data
const getPromotionData = async (req, res) => {
    try {
        const promotions = await Promotion.find({ isActive: true }).sort({ promotionId: 1 });
        
        res.status(200).json({
            success: true,
            data: {
                promotions,
                config: {
                    sectionTitle: "WHY THE WEDDING FILMER?",
                    mainHeading: "HEARTFELT • CINEMATIC • TIMELESS",
                    animationDelay: 200
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching promotion data',
            error: error.message
        });
    }
};

// Get single promotion by ID
const getPromotionById = async (req, res) => {
    try {
        const { id } = req.params;
        const promotion = await Promotion.findOne({ promotionId: parseInt(id) });
        
        if (!promotion) {
            return res.status(404).json({
                success: false,
                message: 'Promotion not found'
            });
        }

        res.status(200).json({
            success: true,
            data: promotion
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching promotion',
            error: error.message
        });
    }
};

module.exports = {
    getPromotionData,
    getPromotionById
};
