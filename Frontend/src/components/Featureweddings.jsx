// Import React library which is needed for JSX syntax
import React from 'react'
// Import GSAP animation library
import gsap from 'gsap'
// Import React hooks for effects, refs, and state management
import { useEffect, useRef, useState } from 'react'
// Import ScrollTrigger plugin from GSAP for scroll-based animations
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
        setFeaturedWeddings([
          {
            id: 1,
            title: 'Sara & Michael',
            description: 'A beautiful beach wedding in Malibu',
            image: '/images/sample-wedding1.jpg'
          },
          {
            id: 2,
            title: 'Priya & Rahul',
            description: 'Traditional ceremony with modern reception',
            image: '/images/sample-wedding2.jpg'
          },
          {
            id: 3,
            title: 'Emma & James',
            description: 'Intimate garden wedding in spring',
            image: '/images/sample-wedding3.jpg'
          },
          {
            id: 4,
            title: 'Emma & James',
            description: 'Intimate garden wedding in spring',
            image: '/images/sample-wedding3.jpg'
          },
        ])
      } finally {
        // Set loading to false whether fetch succeeded or failed
        setLoading(false)
      }
    }
    
    // Call the fetch function when component mounts
    fetchWeddings()
  }, []) // Empty dependency array means this effect runs only once on mount

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
        const chars = Array.from(text).map(char => {
          // Create span for each character
          const span = document.createElement('span')
          // Set character content (use non-breaking space for actual spaces)
          span.innerText = char === ' ' ? '\u00A0' : char
          // Start with opacity 0 (invisible)
          span.style.opacity = '0'
          // Make spans inline-block for better animation control
          span.style.display = 'inline-block'
          
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
            scrub: 0.5, // Smooth animation that follows scroll position with 0.5s delay
            toggleActions: 'play none none reverse' // Controls how animation plays/reverses on scroll
          }
        })
        
        // Add animation to timeline: fade in each character one by one
        tl.to(chars, {
          opacity: 1, // Animate to fully visible
          duration: 0.05, // Duration per character
          stagger: 0.02, // Time between each character animation
          ease: 'power1.inOut' // Easing function for smooth motion
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
  }, []) // Empty dependency array means this runs once on mount
  
  // Component JSX render output
  return (
    // Main container div with ref for animation targeting
    <div className='feature-weddings' ref={featureRef} style={{ 
      padding: '30px', // Inner spacing
      margin: '50px 0', // Vertical margin
      backgroundColor: 'rgba(255,255,255,0.1)', // Slight white background
      borderRadius: '8px', // Rounded corners
      minHeight: '100px', // Minimum height
      position: 'relative' // For positioned elements inside
    }}>
      {/* Animated tagline paragraph */}
      <p ref={textRef} style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>
        Our Films brings people together, capturing the essence of love and celebration.
      </p>
      {/* Header section with title */}
      <div className='feature-weddings-header' style={{
        display: 'flex',
        marginBottom: '20px'
      }}>
        {/* Section title */}
        <h2 style={{ marginBottom: '15px' }}>Featured Weddings</h2>
      </div>
      
      {/* Grid container for wedding cards */}
      <div className='feature-weddings-container' style={{
        display: 'grid', // Grid layout
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // Responsive grid columns
        gap: '20px', // Space between grid items
        marginTop: '30px' // Space above the grid
      }}>
        {/* Conditional rendering based on loading state */}
        {loading ? (
          // Show loading message while data is being fetched
          <div style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Loading wedding data...</div>
        ) : (
          // Map through wedding data to create cards when loaded
          featuredWeddings.map((wedding, index) => (
            // Individual wedding card (with fallback for missing id)
            <div key={wedding.id || index} className='feature-wedding-box' style={{
              padding: '20px', // Inner spacing
              backgroundColor: '#fff', // White background
              borderRadius: '8px', // Rounded corners
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Subtle shadow
            }}>
              {/* Wedding image */}
              <img 
                src={wedding.image} 
                alt={wedding.title} 
                style={{
                  width: '100%', // Full width of container
                  height: '200px', // Fixed height
                  objectFit: 'cover', // Ensure image covers area without distortion
                  borderRadius: '8px', // Rounded corners
                  marginBottom: '10px' // Space below image
                }} 
              />
              {/* Wedding couple names */}
              <h3 style={{ margin: '0 0 10px' }}>{wedding.title}</h3>
              {/* Wedding description */}
              <p style={{ margin: '0' }}>{wedding.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// Export the component for use in other files
export default Featureweddings;