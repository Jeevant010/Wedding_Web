const Testimonial = require('../models/Testimonial');

// Get all testimonials
const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ testimonialId: 1 });
        
        res.status(200).json({
            success: true,
            data: {
                testimonials,
                config: {
                    mainHeading: "NOTES OF GRATITUDE",
                    autoPlayInterval: 5000,
                    animationDuration: 500
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching testimonials',
            error: error.message
        });
    }
};

// Get single testimonial by ID
const getTestimonialById = async (req, res) => {
    try {
        const { id } = req.params;
        const testimonial = await Testimonial.findOne({ testimonialId: parseInt(id) });
        
        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found'
            });
        }

        res.status(200).json({
            success: true,
            data: testimonial
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching testimonial',
            error: error.message
        });
    }
};

module.exports = {
    getTestimonials,
    getTestimonialById
};
