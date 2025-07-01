import React, { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '../styles/HeroCarousel.css';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);

  // Sample wedding data - replace with actual data
  const weddings = [
    {
      id: 1,
      title: "NIKKI & VISHAL",
      location: "LONDON",
      date: "JUNE 2024",
      description: "After nearly giving up on love, I found it when I least expected it—while filming a wedding in Kent, England. There, I met Nikki, the bride's sister, and unknowingly began a new chapter of my life. Filming her family's stories allowed me to glimpse her...",
      video: "/videos/wedding-1.mp4"
    },
    {
      id: 2,
      title: "AAYUSH & SUMAN",
      location: "MEXICO",
      date: "NOVEMBER 2024",
      description: "Two souls, one fearless love, dancing beyond tradition in Mexico's golden light. Aayush and Suman's union speaks the heart's universal language—tender, brave, true. Guided by Aashish Sewing, and heartfelt vows, their story unfolds through...",
      video: "/videos/wedding-2.mp4"
    },
    {
      id: 3,
      title: "PRIYA & JAMES",
      location: "BALI",
      date: "SEPTEMBER 2024",
      description: "In the heart of Bali's lush landscapes, Priya and James exchanged vows surrounded by nature's symphony. Their love story transcends cultures and continents, creating a beautiful tapestry of traditions and modern romance...",
      video: "/videos/wedding-3.mp4"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % weddings.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + weddings.length) % weddings.length);
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % weddings.length);
    }, 10000); // Increased interval for videos
    return () => clearInterval(timer);
  }, [weddings.length]);

  // Reset video when slide changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.error);
    }
  }, [currentSlide]);

  const currentWedding = weddings[currentSlide];

  return (
    <div className="hero-carousel">
      <div className="carousel-container">
        {/* Background Video */}
        <div className="hero-background">
          <video
            ref={videoRef}
            key={currentWedding.id}
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={currentWedding.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay"></div>
        </div>

        {/* Navigation Arrows */}
        <button className="carousel-nav prev" onClick={prevSlide}>
          <FiChevronLeft size={24} />
        </button>
        <button className="carousel-nav next" onClick={nextSlide}>
          <FiChevronRight size={24} />
        </button>

        {/* Content */}
        <div className="hero-content">
          <div className="hero-text">
            <div className="wedding-meta">
              <span className="location">{currentWedding.location}</span>
              <span className="separator">—</span>
              <span className="date">{currentWedding.date}</span>
            </div>
            
            <h1 className="wedding-title">{currentWedding.title}</h1>
            
            <p className="wedding-description">
              {currentWedding.description}
            </p>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="slide-indicators">
          {weddings.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
