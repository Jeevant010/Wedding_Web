import React, { useState, useEffect } from 'react';
import { promotionsAPI, handleAPIError } from '../utils/api';

const PromotionSection = () => {
    const [promotionData, setPromotionData] = useState([]);
    const [promotionConfig, setPromotionConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCards, setVisibleCards] = useState([]);

    // Fetch promotion data
    useEffect(() => {
        const fetchPromotionData = async () => {
            try {
                setLoading(true);
                const response = await promotionsAPI.getAll();
                console.log('Promotion API Response:', response.data); // Debug log
                setPromotionData(response.data.data.promotions || []);
                setPromotionConfig(response.data.data.config || {});
                setError(null);
            } catch (err) {
                setError(handleAPIError(err));
                console.error('Error fetching promotion data:', err);
                setPromotionData([]);
                setPromotionConfig({});
            } finally {
                setLoading(false);
            }
        };

        fetchPromotionData();
    }, []);

    useEffect(() => {
        if (!promotionData.length || !promotionConfig) return;
        
        // Animate cards in sequence
        promotionData.forEach((_, index) => {
            setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
            }, index * promotionConfig.animationDelay);
        });
    }, [promotionData, promotionConfig]);

    // Loading state
    if (loading) {
        return (
            <section className="relative py-20 px-4 md:px-8 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="text-center mb-16">
                            <div className="h-4 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
                            <div className="h-12 bg-gray-300 rounded w-96 mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                            {[1,2,3].map(i => (
                                <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-lg">
                                    <div className="h-72 bg-gray-300"></div>
                                    <div className="p-8 space-y-4">
                                        <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                                        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Error state
    if (error || !promotionData.length || !promotionConfig) {
        return (
            <section className="relative py-20 px-4 md:px-8 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-light text-gray-800 mb-4">Unable to load services</h2>
                    <p className="text-gray-600">{error || 'Please try again later'}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="relative py-20 px-4 md:px-8 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-sm tracking-[0.3em] text-gray-500 mb-4 uppercase font-medium">
                        {promotionConfig.sectionTitle}
                    </p>
                    <h2 className="text-4xl md:text-6xl font-light text-gray-800 tracking-wide">
                        {promotionConfig.mainHeading}
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {(promotionData || []).map((item, index) => (
                        <div
                            key={item?.id || item?.promotionId || index}
                            className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-700 hover:-translate-y-2 ${
                                visibleCards.includes(index) 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-8'
                            }`}
                            style={{
                                transitionDelay: `${index * 100}ms`
                            }}
                        >
                            {/* Image Container */}
                            <div className="relative h-64 md:h-72 overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-20`}></div>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                
                                {/* Category badge */}
                                <div className="absolute top-6 left-6 right-6">
                                    <p className={`text-xs tracking-[0.2em] uppercase font-semibold ${item.categoryColor} bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full inline-block`}>
                                        {item.category}
                                    </p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <h3 className={`text-2xl md:text-3xl font-light mb-4 tracking-wide ${item.textColor} transition-colors duration-300`}>
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-sm md:text-base line-clamp-4">
                                    {item.description}
                                </p>
                            </div>

                            {/* Decorative corner */}
                            <div className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${item.bgGradient} opacity-10 transform rotate-45 translate-x-10 translate-y-10`}></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-amber-100 to-pink-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
        </section>
    );
};

export default PromotionSection;
