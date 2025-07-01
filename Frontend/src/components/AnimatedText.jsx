import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/AnimatedText.css';

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = () => {
    const textRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const text = "Our films bring people closer.";
        const textElement = textRef.current;
        
        // Clear any existing content
        textElement.innerHTML = '';
        
        // Split text into individual letters and wrap each in a span
        text.split('').forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space
            span.className = 'letter';
            textElement.appendChild(span);
        });

        const letters = textElement.querySelectorAll('.letter');
        
        // Create GSAP animation with ScrollTrigger for better reverse animation
        gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "bottom 40%",
                toggleActions: "play reverse play reverse",
                // This ensures smooth animation in both directions
                scrub: false,
                // Optional: add markers for debugging (remove in production)
                // markers: true
            }
        })
        .fromTo(letters, 
            {
                opacity: 0,
                y: 50,
                scale: 0.8
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
                stagger: {
                    amount: 0.3,
                    from: "start"
                }
            }
        );

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section className="animated-text-section" ref={containerRef}>
            <div className="animated-text-container">
                <h2 className="animated-text" ref={textRef}></h2>
            </div>
        </section>
    );
};

export default AnimatedText;
