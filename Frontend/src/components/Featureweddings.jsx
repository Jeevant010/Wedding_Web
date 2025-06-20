import React from 'react'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react' // Added useState
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Featureweddings = () => {
  const featureRef = useRef(null)
  const textRef = useRef(null)
  const [featuredWeddings, setFeaturedWeddings] = useState([]) // State for wedding data
  const [loading, setLoading] = useState(true) // Loading state

  // Fetch data from backend
  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        setLoading(true)
        // Replace with your actual API endpoint
        const response = await fetch('http://localhost:9000/api/weddings/featured')
        
        if (!response.ok) {
          throw new Error('Failed to fetch wedding data')
        }
        
        const data = await response.json()
        setFeaturedWeddings(data)
      } catch (error) {
        console.error('Error fetching wedding data:', error)
        // Set some fallback data in case of error
        setFeaturedWeddings([
          {
            id: 1,
            title: 'Sarah & Michael',
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
          }
        ])
      } finally {
        setLoading(false)
      }
    }
    
    fetchWeddings()
  }, [])

  // GSAP animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const element = featureRef.current
      const textElement = textRef.current
      
      if (element && textElement) {
        console.log("Feature element found, applying animation")
        
        // Set initial state for the container
        gsap.set(element, {
          opacity: 1,  
          visibility: "visible"
        })
        
        // Split text into spans for character-by-character animation
        const text = textElement.innerText
        textElement.innerHTML = '' 
        
        // Create spans for each character
        const chars = Array.from(text).map(char => {
          const span = document.createElement('span')
          span.innerText = char === ' ' ? '\u00A0' : char // Replace space with non-breaking space
          span.style.opacity = '0'
          span.style.display = 'inline-block'
          
          // Add proper spacing for spaces
          if (char === ' ') {
            span.style.marginRight = '0.25em' // Adjust this value as needed
          }
          
          textElement.appendChild(span)
          return span
        })
        
        // Create a timeline for character animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
            toggleActions: 'play none none reverse'
          }
        })
        
        tl.to(chars, {
          opacity: 1,
          duration: 0.05,
          stagger: 0.02,
          ease: 'power1.inOut'
        })
      }
    }, 500)
    
    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, []) // This runs once when component mounts
  
  return (
    
    <div className='feature-weddings' ref={featureRef} style={{ 
      padding: '30px', 
      margin: '50px 0', 
      backgroundColor: 'rgba(255,255,255,0.1)', 
      borderRadius: '8px',
      minHeight: '100px',
      position: 'relative'
    }}>
      <p ref={textRef} style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>
        Our Films brings people together, capturing the essence of love and celebration.
      </p>
      <div className='feature-weddings-header' style={{
        display: 'flex',
        marginBottom: '20px'
      }}>


        

        
        <h2 style={{ marginBottom: '15px' }}>Featured Weddings</h2>
      </div>
      
      

      <div className='feature-weddings-container' style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Loading wedding data...</div>
        ) : (
          featuredWeddings.map((wedding, index) => (
            <div key={wedding.id || index} className='feature-wedding-box' style={{
              padding: '20px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={wedding.image} 
                alt={wedding.title} 
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '10px'
                }} 
              />
              <h3 style={{ margin: '0 0 10px' }}>{wedding.title}</h3>
              <p style={{ margin: '0' }}>{wedding.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Featureweddings;