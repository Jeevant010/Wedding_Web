const Footer = require('../models/Footer');

// Get footer data
const getFooterData = async (req, res) => {
    try {
        const footerData = await Footer.findOne();
        
        if (!footerData) {
            return res.status(404).json({
                success: false,
                message: 'Footer data not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: footerData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching footer data',
            error: error.message
        });
    }
};

module.exports = {
    getFooterData
};
