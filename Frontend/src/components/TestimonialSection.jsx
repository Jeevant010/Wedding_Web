import React, { useState, useEffect } from 'react';
import { testimonialsAPI, handleAPIError } from '../utils/api';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const TestimonialSection = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [testimonialConfig, setTestimonialConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Fetch testimonials data
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                setLoading(true);
                const response = await testimonialsAPI.getAll();
                setTestimonials(response.data.data.testimonials);
                setTestimonialConfig(response.data.data.config);
                setError(null);
            } catch (err) {
                setError(handleAPIError(err));
                console.error('Error fetching testimonials:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying || isTransitioning || !testimonials.length || !testimonialConfig) return;

        const interval = setInterval(() => {
            handleSlideChange((prevIndex) => 
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, testimonialConfig.autoPlayInterval);

        return () => clearInterval(interval);
    }, [isAutoPlaying, isTransitioning, testimonials.length, testimonialConfig]);

    const handleSlideChange = (indexOrFunction) => {
        setIsTransitioning(true);
        
        setTimeout(() => {
            if (typeof indexOrFunction === 'function') {
                setCurrentIndex(indexOrFunction);
            } else {
                setCurrentIndex(indexOrFunction);
            }
            setIsTransitioning(false);
        }, 150);
    };

    const goToPrevious = () => {
        setIsAutoPlaying(false);
        handleSlideChange(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToNext = () => {
        setIsAutoPlaying(false);
        handleSlideChange(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToSlide = (index) => {
        setIsAutoPlaying(false);
        handleSlideChange(index);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const currentTestimonial = testimonials[currentIndex];

    // Loading state
    if (loading) {
        return (
            <section className="relative py-16 px-4 overflow-hidden bg-gray-900/50 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-12">
                    <div className="animate-pulse">
                        <div className="text-center mb-12">
                            <div className="h-4 bg-gray-300 rounded w-64 mx-auto mb-3"></div>
                            <div className="h-8 bg-gray-300 rounded w-96 mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[400px]">
                            <div className="space-y-4">
                                <div className="h-6 bg-gray-300 rounded w-full"></div>
                                <div className="h-6 bg-gray-300 rounded w-5/6"></div>
                                <div className="h-6 bg-gray-300 rounded w-4/6"></div>
                                <div className="h-4 bg-gray-300 rounded w-32 mt-8"></div>
                            </div>
                            <div className="flex justify-center lg:justify-end">
                                <div className="w-full max-w-sm aspect-[4/5] bg-gray-300 rounded-xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Error state
    if (error || !testimonials.length || !testimonialConfig) {
        return (
            <section className="relative py-16 px-4 overflow-hidden bg-gray-900/50 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-12 text-center">
                    <h2 className="text-2xl font-light text-gray-800 mb-4">Unable to load testimonials</h2>
                    <p className="text-gray-600">{error || 'Please try again later'}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="relative py-16 px-4 overflow-hidden bg-blue-50 backdrop-blur-sm">
            {/* Popup Container */}
            <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-12 animate-fade-in-up transform hover:scale-[1.02] transition-all duration-300">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-xs tracking-[0.3em] text-gray-500 mb-3 uppercase font-medium">
                        {testimonialConfig.sectionTitle}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-light text-gray-800 tracking-wide">
                        {testimonialConfig.mainHeading}
                    </h2>
                </div>

                {/* Testimonial Content */}
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[400px] transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
                    {/* Left side - Quote */}
                    <div className="flex flex-col justify-center h-full">
                        <div className="relative px-2 lg:px-0">
                            {/* Large decorative quote mark */}
                            <div className="absolute -top-6 -left-4 text-4xl md:text-6xl text-gray-200 font-serif leading-none select-none pointer-events-none">
                                "
                            </div>
                            
                            <blockquote className="relative text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-700 font-light mb-8 text-center lg:text-left">
                                {currentTestimonial.quote}
                            </blockquote>
                            
                            <div className="text-center lg:text-left space-y-2">
                                <p className="text-lg font-medium text-gray-900 tracking-wide">
                                    - {currentTestimonial.author}
                                </p>
                                <p className="text-xs text-gray-600 tracking-[0.15em] uppercase">
                                    {currentTestimonial.role}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Image */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-sm">
                            <div className="group relative aspect-[5/4] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                <img
                                    src={currentTestimonial.image}
                                    alt={`${currentTestimonial.author} wedding`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                
                                {/* Overlay gradient on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            
                            {/* Category badge */}
                            <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                                {currentTestimonial.category}
                            </div>

                            {/* Decorative elements - smaller for popup */}
                            <div className="absolute -top-2 -right-2 w-12 h-12 bg-gray-100 rounded-full -z-10 animate-pulse"></div>
                            <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-gray-50 rounded-full -z-10"></div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center mt-12 space-x-6">
                    {/* Previous button */}
                    <button
                        onClick={goToPrevious}
                        className="group p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border border-gray-200"
                        aria-label="Previous testimonial"
                        disabled={isTransitioning}
                    >
                        <IoChevronBack className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                    </button>

                    {/* Dots indicator */}
                    <div className="flex space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                disabled={isTransitioning}
                                className={`relative w-3 h-3 rounded-full transition-all duration-400 overflow-hidden ${
                                    index === currentIndex
                                        ? 'bg-gray-700 scale-125 shadow-md'
                                        : 'bg-gray-300 hover:bg-gray-500 hover:scale-110'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            >
                                {/* Ripple effect on hover */}
                                <span className="absolute inset-0 rounded-full bg-black/10 scale-0 group-hover:scale-150 transition-transform duration-300"></span>
                            </button>
                        ))}
                    </div>

                    {/* Next button */}
                    <button
                        onClick={goToNext}
                        className="group p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border border-gray-200"
                        aria-label="Next testimonial"
                        disabled={isTransitioning}
                    >
                        <IoChevronForward className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                    </button>
                </div>

                {/* Progress bar */}
                <div className="mt-8 max-w-xs mx-auto">
                    <div className="relative w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                        <div
                            className="bg-gray-700 h-1 rounded-full transition-all duration-500 ease-out relative"
                            style={{
                                width: `${((currentIndex + 1) / testimonials.length) * 100}%`
                            }}
                        >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                        </div>
                    </div>
                </div>

                {/* Status indicator */}
                <div className="text-center mt-4">
                    <p className={`text-xs text-gray-400 transition-all duration-300 ${
                        isAutoPlaying 
                            ? 'animate-pulse opacity-70' 
                            : 'opacity-50'
                    }`}>
                        {isAutoPlaying ? 'Auto-playing' : 'Paused'} • {currentIndex + 1} of {testimonials.length}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
