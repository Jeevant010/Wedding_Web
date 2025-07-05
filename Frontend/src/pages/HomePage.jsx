import React from 'react';
import SearchBar from '../components/SearchBar';
import HeroCarousel from '../components/HeroCarousel';
import AnimatedText from '../components/AnimatedText';
import WatchTrailerSection from '../components/WatchTrailerSection';
import TestimonialSection from '../components/TestimonialSection';
import PromotionSection from '../components/PromotionSection';
import MusicSection from '../components/MusicSection';
import '../styles/HomePage.css';

const HomePage = () => {
    const handleSearch = (searchQuery) => {
        console.log("Searching for:", searchQuery);
        // Implement your search logic here
        // You can filter weddings, navigate to search results, etc.
    };

    return (
        <>
            <div className='homepage bg-white'>
                {/* Hero section with search bar and carousel - no padding/margin */}
                <div className="relative min-h-screen overflow-hidden">
                    {/* Search Bar positioned at the top with reduced width */}
                    <div className="absolute top-4 left-0 right-0 z-50">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                    
                    {/* Hero Carousel - full screen */}
                    <HeroCarousel />
                </div>
                
                {/* Other homepage content */}
                <AnimatedText />
                <WatchTrailerSection />
                <MusicSection />
                <TestimonialSection />
                <PromotionSection />
            </div>
        </>
    );
};

export default HomePage;