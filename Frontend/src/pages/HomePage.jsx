import { useState, useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import FeatureWeddings from '../components/FeatureWeddings'
import AboutSection from '../components/AboutSection'
import TestimonialSection from '../components/TestimonialSection'
import ContactSection from '../components/ContactSection'
import HeaderSection from '../components/Header'
import axios from 'axios';
import '../styles/HomePage.css'; // Assuming you have a CSS file for styling
const HomePage = () => {
    const [homeData, setHomeData] = useState({
        HeaderSection:{

        },
        heroSection: { 
            title: "Loading",
            subtitle: "please wait",
            backgroundImage: "/assets/wedding-hero.jpg"
        },
        featureWeddings: [],
        aboutSection: {
            title: "Loading",
            description: "waiting",
            image: "/assets/default-about.jpg"
        },
        testimonialSection: [],
        contactInfo: {}
    });
    
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHomedata = async() => {
            try {
                const response = await axios.get('http://localhost:9000/home');
                if(response.data && response.data.data){
                    setHomeData(response.data.data);
                }
                setLoading(false);
            } catch(err) {
                console.error("Error fetching home data:", err);
                setError("Failed to load home data");
                setLoading(false);
            }
        };
        fetchHomedata();
    }, []);

    if(loading){
        return <div className='loading'>Loading...</div>;
    }
    
    if(error){
        return <div className='error-message'>Error: {error}</div>;
    }

    return (
        <main className='homepage'>
            {homeData.header &&(
                <HeaderSection
                    />
            )}
            {homeData.heroSection && (
                <HeroSection
                    title={homeData.heroSection.title}
                    subtitle={homeData.heroSection.subtitle}
                    backgroundImage={homeData.heroSection.backgroundImage}
                />
            )}
            
            {homeData.featureWeddings && (
                <FeatureWeddings weddings={homeData.featureWeddings} />
            )}
            
            {homeData.aboutSection && (
                <AboutSection 
                    title={homeData.aboutSection.title}
                    description={homeData.aboutSection.description}
                    image={homeData.aboutSection.image}
                />
            )}
            
            {homeData.testimonialSection && (
                <TestimonialSection testimonials={homeData.testimonialSection} />
            )}
            
            {homeData.contactInfo && (
                <ContactSection contactInfo={homeData.contactInfo} />
            )}
        </main>
    );
};

export default HomePage;