import { useState , useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import FeatureWeddings from '../components/FeatureWeddings'
import AboutSection from '../components/AboutSection'
import TestimonialSection from '../components/TestimonialSection'
import ContactSection from '../components/ContactSection'
import axios from 'axios';

const HomePage =() =>{
    const [homeData, setHomeData] = useState({
        heroSection: {},
        featureWeddings: [],
        aboutSection: {},
        testimonialSection: [],
        contactSection: {}
    });
    const [Loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>{
        const fetchHomedata = async()=> {
            try{
                const response = await axios.get('http://localhost:9000/home');
                if(response.data && response.data.data){
                    setHomeData(response.data.data);
                }
                setLoading(false);
            }catch(err){
                console.error("Error fetching home data:", err);
                setError("Failed to load home data");
                setLoading(false);
               
            }
        };
        fetchHomedata();
    }, []);
    if(Loading){
        return <div className='loading'>Loading...</div>;
    }
    if(error){
        return <div className='error-message'>Error: {error}</div>;
    }
    return (
    <>
        <div className='homepage'>
            <HeroSection data={homeData.heroSection}/>
        </div>
    </>
        
    );
};

export default HomePage;