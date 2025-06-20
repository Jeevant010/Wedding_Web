import React from 'react'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react' // Added useState
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FeatureWeddings = () => {
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