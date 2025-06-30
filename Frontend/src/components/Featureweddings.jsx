import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import '../styles/FeatureWeddings.css';

gsap.registerPlugin(ScrollTrigger);

const Featureweddings = () => {
  const featureRef = useRef(null);
  const textRef = useRef(null);
  const trackRef = useRef(null);
  
  const [featuredWeddings, setFeaturedWeddings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  const API_BASE_URL = import.meta.env.PROD 
    ? 'https://back-wedding-ashy.vercel.app'
    : 'http://localhost:9000';

  // Fetch wedding data
  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/weddings/featured`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch wedding data');
        }
        
        const data = await response.json();
        setFeaturedWeddings(data);
      } catch (error) {
        console.error('Error fetching wedding data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeddings();
  }, [API_BASE_URL]);

  // Text animation setup
  useEffect(() => {
    const timer = setTimeout(() => {
      const element = featureRef.current;
      const textElement = textRef.current;
      
      if (element && textElement) {
        gsap.set(element, { opacity: 1, visibility: "visible" });
        
        const text = textElement.innerText;
        textElement.innerHTML = '';
        
        const chars = Array.from(text).map((char, index) => {
          const span = document.createElement('span');
          span.innerText = char === ' ' ? '\u00A0' : char;
          span.style.opacity = '0';
          
          if (index % 3 === 0) {
            span.style.transform = 'translateY(2px)';
          } else if (index % 3 === 1) {
            span.style.transform = 'translateY(-2px)';
          }
          
          if (char === ' ') {
            span.style.marginRight = '0.25em';
          }
          
          textElement.appendChild(span);
          return span;
        });
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top 40%',
            scrub: false,
            toggleActions: 'play none none reverse'
          }
        });
        
        tl.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.03,
          stagger: { each: 0.03, from: "random" },
          ease: 'power2.out'
        });
      }
    }, 500);
    
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Card animation
  useEffect(() => {
    if (!loading && featuredWeddings.length > 0) {
      const cards = document.querySelectorAll('.feature-wedding-box');
      
      gsap.fromTo(cards, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.feature-weddings-container',
            start: 'top 80%',
          }
        }
      );
    }
  }, [loading, featuredWeddings]);
  
  // Responsive card display
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsToShow(1);
      } else if (width < 1200) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Carousel navigation
  const nextSlide = () => {
    if (currentIndex < featuredWeddings.length - cardsToShow) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Update carousel position
  useEffect(() => {
    if (trackRef.current) {
      const cardWidth = 350;
      const gap = 30;
      const translateX = currentIndex * (cardWidth + gap);
      trackRef.current.style.transform = `translateX(-${translateX}px)`;
    }
  }, [currentIndex]);

  // Component JSX render output
  return (
    <div className="feature-weddings" ref={featureRef}>
      <div className="tagline-container">
        <svg className="quote-mark quote-mark-left" width="40" height="40" viewBox="0 0 24 24">
          <path d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" 
                fill="#d4a373" opacity="0.6" />
        </svg>
        
        <p ref={textRef} className="feature-tagline">
          Our Films brings people together, capturing the essence of love and celebration.
        </p>
        
        <svg className="quote-mark quote-mark-right" width="40" height="40" viewBox="0 0 24 24">
          <path d="M14,17L16,13H13V7H19V13L17,17H14M6,17L8,13H5V7H11V13L9,17H6Z" 
                fill="#d4a373" opacity="0.6" />
        </svg>
      </div>
      <div className="feature-weddings-header">
        <h2 style={{ color: '#d4a373', fontWeight: 'bold' }}>Watch Trailer</h2>
      </div>
      
      <div className="feature-weddings-container">
        <button 
          className="nav-arrow prev" 
          onClick={prevSlide}
          disabled={currentIndex === 0}
          aria-label="Previous wedding"
        >
          ←
        </button>
        
        <button 
          className="nav-arrow next" 
          onClick={nextSlide}
          disabled={currentIndex >= featuredWeddings.length - cardsToShow}
          aria-label="Next wedding"
        >
          →
        </button>

        {/* Carousel wrapper */}
        <div className="wedding-cards-wrapper">
          <div className="wedding-cards-track" ref={trackRef}>
            {loading ? (
              <div className="loading-message">Loading wedding data...</div>
            ) : (
              // Map through wedding data to create clickable cards when loaded
              featuredWeddings.map((wedding, index) => (
                <Link 
                  key={wedding.id || index}
                  to={`/weddings/${wedding.id || index}`}
                  className="feature-wedding-link"
                >
                  {/* Individual wedding card */}
                  <div className="feature-wedding-box">
                    <img 
                      src={wedding.image} 
                      alt={wedding.title} 
                      className="feature-wedding-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/600x400?text=Wedding+Image';
                      }}
                    />
                    <h3 className="feature-wedding-title">{wedding.title}</h3>
                    <p className="feature-wedding-date">{wedding.date}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="view-more-container">
        <Link to="/Films" className="view-more-btn">
          View More Weddings →
        </Link>
      </div>
    </div>
  );
};

export default Featureweddings;