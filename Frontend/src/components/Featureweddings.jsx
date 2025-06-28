// Import React library which is needed for JSX syntax
import React, { useEffect, useRef, useState } from 'react';
// Import GSAP animation library
import gsap from 'gsap'
// Import React hooks for effects, refs, and state management
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// Import Link component from React Router for navigation
import { Link } from 'react-router-dom';
import '../styles/FeatureWeddings.css';

// Register ScrollTrigger plugin with GSAP to enable its functionality
gsap.registerPlugin(ScrollTrigger)

// Define the Featureweddings functional component
const Featureweddings = () => {
  // Create a ref to access the main feature container DOM element
  const featureRef = useRef(null)
  // Create a ref to access the text element for animation
  const textRef = useRef(null)
  // State to store the fetched wedding data
  const [featuredWeddings, setFeaturedWeddings] = useState([])
  // State to track loading status of wedding data
  const [loading, setLoading] = useState(true)

  // Update the fetch URL to be environment-aware
  const API_BASE_URL = import.meta.env.PROD 
    ? 'https://back-wedding-ashy.vercel.app'  // Production URL
    : 'http://localhost:9000';               // Development URL

  // Effect hook that runs on component mount to fetch wedding data
  useEffect(() => {
    // Async function to fetch wedding data from API
    const fetchWeddings = async () => {
      try {
        // Set loading state to true before starting the fetch
        setLoading(true)
        // Make API request to the backend server to get featured weddings
        const response = await fetch(`${API_BASE_URL}`)
          
        // Check if the response was successful
        if (!response.ok) {
          // Throw error if response was not ok (status code not in 200-299 range)
          throw new Error('Failed to fetch wedding data')
        }
        
        // Parse JSON response into data object
        const data = await response.json()
        // Update state with fetched wedding data
        setFeaturedWeddings(data)
      } catch (error) {
        // Log any errors that occur during fetching
        console.error('Error fetching wedding data:', error)
        // Provide fallback data in case of error
      } finally {
        // Set loading to false when fetch completes (success or error)
        setLoading(false)
      }
    };
    
    // Call the fetch function
    fetchWeddings();
  }, [API_BASE_URL]); // Empty dependency array means this effect runs only once on mount

  // Effect hook for text animation setup
  useEffect(() => {
    // Set a timeout to ensure DOM is ready before animation
    const timer = setTimeout(() => {
      // Get DOM elements from refs
      const element = featureRef.current
      const textElement = textRef.current
      
      // Check if both DOM elements exist
      if (element && textElement) {
        // Log that elements were found (for debugging)
        console.log("Feature element found, applying animation")
        
        // Set initial state for the feature container
        gsap.set(element, {
          opacity: 1,  // Make element visible
          visibility: "visible" // Ensure visibility property is set
        })
        
        // Store the original text content
        const text = textElement.innerText
        // Clear the text element to prepare for animated spans
        textElement.innerHTML = '' 
        
        // Split text into individual characters and create span elements for each
        const chars = Array.from(text).map((char, index) => {
          // Create span for each character
          const span = document.createElement('span')
          // Set character content (use non-breaking space for actual spaces)
          span.innerText = char === ' ' ? '\u00A0' : char
          // Start with opacity 0 (invisible)
          span.style.opacity = '0'
          
          // Add a subtle individual transform to each character
          if (index % 3 === 0) {
            span.style.transform = 'translateY(2px)'
          } else if (index % 3 === 1) {
            span.style.transform = 'translateY(-2px)'
          }
          
          // Add spacing for space characters
          if (char === ' ') {
            span.style.marginRight = '0.25em'
          }
          
          // Add the span to the text element
          textElement.appendChild(span)
          // Return span for animation targeting
          return span
        })
        
        // Create a GSAP timeline for the text animation
        const tl = gsap.timeline({
          // Configure ScrollTrigger for scroll-based animation
          scrollTrigger: {
            trigger: element, // Element that triggers the animation
            start: 'top 80%', // Start animation when top of element hits 80% down the viewport
            end: 'top 40%', // End animation when top of element hits 40% down the viewport
            scrub: false, // Change to false for a smoother animation
            toggleActions: 'play none none reverse' // Controls how animation plays/reverses on scroll
          }
        })
        
        // Add more complex animation to timeline
        tl.to(chars, {
          opacity: 1, // Animate to fully visible
          y: 0, // Reset any Y offset
          duration: 0.03, // Duration per character
          stagger: {
            each: 0.03, // Time between each character animation
            from: "random" // Animate in random order for more interest
          },
          ease: 'power2.out' // Easing function for smooth motion
        })  
      }
    }, 500) // 500ms delay to ensure DOM is ready
    
    // Cleanup function when component unmounts
    return () => {
      // Clear the timeout to prevent memory leaks
      clearTimeout(timer)
      // Kill all ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

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
  
  // Component JSX render output
  return (
    // Main container div with ref for animation targeting
    <div className="feature-weddings" ref={featureRef}>
      {/* Animated tagline with decorative elements */}
      <div className="tagline-container">
        {/* Decorative quote mark */}
        <svg className="quote-mark quote-mark-left" width="40" height="40" viewBox="0 0 24 24">
          <path d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" 
                fill="#d4a373" opacity="0.6" />
        </svg>
        
        {/* Animated text with ref for GSAP targeting */}
        <p ref={textRef} className="feature-tagline">
          Our Films brings people together, capturing the essence of love and celebration.
        </p>
        
        {/* Matching closing quote mark */}
        <svg className="quote-mark quote-mark-right" width="40" height="40" viewBox="0 0 24 24">
          <path d="M14,17L16,13H13V7H19V13L17,17H14M6,17L8,13H5V7H11V13L9,17H6Z" 
                fill="#d4a373" opacity="0.6" />
        </svg>
      </div>

      {/* Header section with title */}
      <div className="feature-weddings-header">
        {/* Section title */}
        <h2>Featured Weddings</h2>
      </div>
      
      {/* Grid container for wedding cards */}
      <div className="feature-weddings-container">
        {/* Conditional rendering based on loading state */}
        {loading ? (
          // Show loading message while data is being fetched
          <div className="loading-message">Loading wedding data...</div>
        ) : (
          // Map through wedding data to create clickable cards when loaded
          featuredWeddings.map((wedding, index) => (
            // Use Link component for navigation to individual wedding pages
            <Link 
              // Generate a unique React key using the wedding ID if available, or fall back to the array index
              key={wedding.id || index}
              
              // Define the route destination for when the card is clicked
              // This creates a dynamic URL path to a specific wedding detail page
              // For example: "/weddings/123" where 123 is the wedding ID
              // If no ID exists, it will use the array index instead
              to={`/weddings/${wedding.id || index}`}
              className="feature-wedding-link"
            >
              {/* Individual wedding card */}
              <div className="feature-wedding-box">
                {/* Wedding image */}
                <img 
                  src={wedding.image} 
                  alt={wedding.title} 
                  className="feature-wedding-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/600x400?text=Wedding+Image';
                  }}
                />
                {/* Wedding couple names */}
                <h3 className="feature-wedding-title">{wedding.title}</h3>
                {/* Wedding description */}
                <p className="feature-wedding-description">{wedding.description}</p>
                {/* View details button or indicator */}
                <div className="view-details">
                  View Details →
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

// Export the component for use in other files
export default Featureweddings;