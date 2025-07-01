import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/MusicSection.css';

gsap.registerPlugin(ScrollTrigger);

const MusicSection = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const descriptionRef = useRef(null);
    const vinylRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current], {
                opacity: 0,
                y: 30
            });

            gsap.set(vinylRef.current, {
                opacity: 0,
                scale: 0.8,
                rotation: -20
            });

            // Create timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    end: "bottom 30%",
                    toggleActions: "play reverse play reverse"
                }
            });

            // Animate text elements
            tl.to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            })
            .to(subtitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.5")
            .to(descriptionRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.3")
            // Animate vinyl
            .to(vinylRef.current, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 1,
                ease: "back.out(1.7)"
            }, "-=0.5");

            // Continuous vinyl rotation
            gsap.to(vinylRef.current, {
                rotation: 360,
                duration: 20,
                ease: "none",
                repeat: -1,
                transformOrigin: "center center"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="music-section" ref={sectionRef}>
            <div className="container">
                <div className="music-content">
                    <div className="text-content">
                        <p className="section-label" ref={titleRef}>ORIGINAL COMPOSITIONS</p>
                        <h2 className="main-title" ref={subtitleRef}>
                            CREATING MUSIC THAT<br />
                            MAKES YOU <span className="highlight">FEEL.</span>
                        </h2>
                        <p className="description" ref={descriptionRef}>
                            The Wedding Filmer label creates music with a keen focus<br />
                            on lyrics and background scores that set the sounds for<br />
                            weddings across cultures.
                        </p>
                    </div>
                    
                    <div className="vinyl-container" ref={vinylRef}>
                        <div className="vinyl-record">
                            <div className="vinyl-center">
                                <div className="logo-container">
                                    <div className="wedding-filmer-logo">
                                        <span className="logo-text">The<br />Wedding<br />Filmer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MusicSection;
