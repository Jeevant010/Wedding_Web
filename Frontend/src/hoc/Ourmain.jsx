import React from "react";
import Header from '../Components/Header.jsx' ;
import Footer from '../Components/Footer.jsx' ;

const Ourmain = 
    (Component) => 
    ({ ...props }) => {
        return (
            <div>
                <Header />
                <Component {...props} />
                <Footer />
            </div>
        );
    };

export default Ourmain;