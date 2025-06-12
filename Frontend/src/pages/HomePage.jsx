import { useState , useEffect } from 'react'
import HeroSection from '../components/HeroSection'
// import FeatureWeddings from '../components/FeatureWeddings'
import AboutSection from '../components/AboutSection'
import TestimonialSection from '../components/TestimonialSection'
import ContactSection from '../components/ContactSection'
import axios from 'axios';

const HomePage =() =>{
    const [homeData, setHomeData] = useState({
        herosection:{
            title:"Loading",
            subtitle:"please wait",
            backgroundImage:"/images/default-hero.jpg"
        },
        featureWeddings:[],
        aboutSection:{
            title:"Loading",
            description:"waiting",
            image:"/images/default-about.jpg"
        },
        testimonialSection:[],
        contactInfo:{}
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
                setHomeData({
                    heroSection:{
                        title:"Your Beautiful Wedding Story",
                        subtitle:"Professional Wedding Photography & Videography",
                        backgroundImage:"/images/default-hero.jpg"
                    },
                    featureWeddings:[
                        {
                            title:"Sarah & John's Wedding",
                            coupleNames:"Sarah & John",
                            location:"Beachside Resort",
                            date:"2023-06-15",
                            thumbnailImage:"/images/wedding1.jpg",
                            slug:"sarah-john-wedding"
                        }
                    ],
                    aboutSection:{
                        title:"About Us",
                        description:"We capture authentic emotions and create timeless memories of your special day.",
                        image:"/images/default-about.jpg"
                    },
                    testimonialSection:[
                        {
                            quote:"This was the best day of our lives, captured perfectly!",
                            author:"Sarah & John",
                            weddingDate:"2023-06-15",
                            image:"/images/testimonial1.jpg"
                        }
                    ],
                    contactInfo:{
                        email:"wedding@example.com",
                        phone:"+1234567890",
                        instagram:"link for instagram",
                        facebook:"link for facebook"
                    }
                });
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
        // <main className='homepage'>
        //     <HeroSection
        //         title={homeData.heroSection.title}
        //         subtitle={homeData.heroSection.subtitle}
        //         backgroundImage={homeData.heroSection.backgroundImage}
        //     />
        //     <featureWeddings weddings= {homeData.featureWeddings} />
        //     <AboutSection 
        //         title={homeData.aboutSection.title}
        //         description={homeData.aboutSection.description}
        //         image={homeData.aboutSection.image}
        //     />
        //     <TestimonialSection testimonials={homeData.testimonialSection} />
        //     <ContactSection contactInfo={homeData.contactInfo} />
        // </main>
        <div className='homepage'>
            <h1>Wedding Website </h1>
        </div>
    );
};

export default HomePage;