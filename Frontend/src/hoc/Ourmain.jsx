import React from "react";
// Note: Header and Footer components are not currently available in the project
// This HOC is currently disabled until Header and Footer components are implemented

const Ourmain = (Component) => {
    const WrappedComponent = ({ ...props }) => {
        return (
            <div>
                {/* <Header /> */}
                <Component {...props} />
                {/* <Footer /> */}
            </div>
        );
    };
    
    WrappedComponent.displayName = `Ourmain(${Component.displayName || Component.name})`;
    return WrappedComponent;
};

export default Ourmain;