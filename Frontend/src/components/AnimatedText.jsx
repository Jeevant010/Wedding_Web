import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/AnimatedTextMinimal.css';

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = () => {
    const textRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const text = "Our films bring people closer.";
        const textElement = textRef.current;
        
        // Clear and create letter spans
        textElement.innerHTML = text.split('').map(char => 
            `<span class="letter inline-block transition-all duration-300 relative opacity-0 translate-y-12 scale-75 hover:text-red-500 hover:scale-110 hover:-translate-y-1" style="font-family: 'Dancing Script', cursive; font-weight: 600;">${char === ' ' ? '\u00A0' : char}</span>`
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
        <section 
            className="p-2.5 bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center min-h-[50vh] relative overflow-hidden mt-2.5 animated-text-bg"
            ref={containerRef}
        >
            <div className="max-w-6xl text-center relative z-10">
                <h2 
                    className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-700 m-0 tracking-wide leading-tight drop-shadow-sm dancing-text"
                    style={{ fontFamily: "'Dancing Script', cursive", fontWeight: '600' }}
                    ref={textRef}
                ></h2>
            </div>
        </section>
    );
};

export default AnimatedText;
