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
        
        // Clear and create letter spans
        textElement.innerHTML = text.split('').map(char => 
            `<span class="letter">${char === ' ' ? '\u00A0' : char}</span>`
        ).join('');

        const letters = textElement.querySelectorAll('.letter');
        
        // GSAP animation
        gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "bottom 40%",
                toggleActions: "play reverse play reverse"
            }
        })
        .fromTo(letters, 
            { opacity: 0, y: 50, scale: 0.8 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
                stagger: { amount: 0.3, from: "start" }
            }
        );

        return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
