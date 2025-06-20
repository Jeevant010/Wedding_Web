import { useState , useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import Featureweddings from '../components/Featureweddings'
import AboutSection from '../components/AboutSection'
import TestimonialSection from '../components/TestimonialSection'
import ContactSection from '../components/ContactSection'
import HeaderSection from '../components/HeaderSection'
import axios from 'axios';

const HomePage =() =>{
    const [homeData, setHomeData] = useState({
        HeaderSection: {},
        HeroSection: {},
        Featureweddings: [],
        TestimonialSection: [],
        AboutSection: {},
        ContactSection: {}
    });
    const [Loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>{
        const fetchHomedata = async()=> {
            try{
                const response = await axios.get('https://back-wedding-ashy.vercel.app/');
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
            <HeaderSection data={homeData.HeaderSection}/>
            <HeroSection data={homeData.HeroSection}/>
            <Featureweddings data={homeData.Featureweddings}/>
            <TestimonialSection data={homeData.TestimonialSection}/>
            <AboutSection data={homeData.AboutSection}/>
        </div>
    </>
        
    );
};

export default HomePage;