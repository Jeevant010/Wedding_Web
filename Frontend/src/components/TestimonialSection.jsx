// This comment describes the purpose of this component: to create a testimonial grid with images, text, and names
import React from 'react'; // Import React library to enable JSX syntax
import '../styles/TestimonialSection.css'; // Import the component's stylesheet

// Define and export the TestimonialSection functional component
export const TestimonialSection = () => {
  // Define an array of testimonial objects that contain all the data we need to display
  const testimonials = [
    {
      id: 1, // Unique identifier for this testimonial
      name: "John & Sarah", // The couple's names
      image: "https://images.unsplash.com/photo-1529636444744-adffc9135a5e?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3", // URL to the couple's image
      quote: "Our wedding film exceeded all expectations. They captured moments we didn't even notice on the day, and now we can relive them forever.", // The testimonial text
      role: "Beach Wedding" // The type of wedding they had
    },
    {
      id: 2, // Unique identifier for this testimonial
      name: "Priya & Rahul", // The couple's names
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3", // URL to the couple's image
      quote: "Their attention to detail and ability to capture the essence of our traditional ceremony while keeping a modern touch was remarkable.", // The testimonial text
      role: "Traditional Wedding" // The type of wedding they had
    },
    {
      id: 3, // Unique identifier for this testimonial
      name: "Emma & James", // The couple's names
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3", // URL to the couple's image
      quote: "The team was unobtrusive yet captured all the special moments. Our garden wedding film feels like a professional movie!", // The testimonial text
      role: "Garden Wedding" // The type of wedding they had
    },
    {
      id: 4, // Unique identifier for this testimonial
      name: "Michael & David", // The couple's names
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3", // URL to the couple's image
      quote: "They made us feel completely comfortable and captured our love story in such a genuine way. The final video makes us cry every time.", // The testimonial text
      role: "City Wedding" // The type of wedding they had
    },
    {
      id: 5, // Unique identifier for this testimonial
      name: "Aisha & Omar", // The couple's names
      image: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3", // URL to the couple's image
      quote: "Working with this team was a dream. They respected our cultural traditions while creating a stunning wedding film we'll cherish forever.", // The testimonial text
      role: "Cultural Wedding" // The type of wedding they had
    },
    {
      id: 6, // Unique identifier for this testimonial
      name: "Sophia & Thomas", // The couple's names
      image: "https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3", // URL to the couple's image
      quote: "From our first meeting to receiving the final film, the service was exceptional. They truly understand how to tell a couple's unique story.", // The testimonial text
      role: "Rustic Wedding" // The type of wedding they had
    }
  ];

  // Return the JSX that defines the component's UI
  return (
    // Main container for the testimonial section with a class for styling
    <div className="testimonial-section">
      {/* Header section containing the title and subtitle */}
      <div className="testimonial-header">
        <h2>What Our Couples Say</h2> {/* Main heading for the testimonials section */}
        <p className="subtitle">Real experiences from the couples whose special days we've captured</p> {/* Descriptive subtitle */}
      </div>
      
      {/* Grid container that will arrange testimonial cards in a responsive layout */}
      <div className="testimonial-grid">
        {/* Map through each testimonial in the array to create individual cards */}
        {testimonials.map((testimonial) => (
          // Individual testimonial card container with unique key for React's reconciliation
          <div className="testimonial-card" key={testimonial.id}>
            {/* Container for the testimonial quote text with decorative elements */}
            <div className="testimonial-quote-box">
              {/* SVG quote icon for visual interest */}
              <svg className="quote-icon" width="36" height="36" viewBox="0 0 24 24" fill="#e6e4e1">
                <path d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" /> {/* SVG path data for quotation marks */}
              </svg>
              {/* The actual testimonial text */}
              <p className="testimonial-text">{testimonial.quote}</p>
            </div>
            
            {/* Container for information about the person giving the testimonial */}
            <div className="testimonial-person">
              {/* Container that crops and styles the person's image */}
              <div className="testimonial-image-container">
                <img 
                  src={testimonial.image} // Image source URL
                  alt={testimonial.name} // Alternative text for accessibility
                  className="testimonial-image" // Class for styling
                />
              </div>
              {/* Container for the person's name and role */}
              <div className="testimonial-info">
                <h4 className="testimonial-name">{testimonial.name}</h4> {/* Display the person's name */}
                <p className="testimonial-role">{testimonial.role}</p> {/* Display the person's role or wedding type */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection; // Default export of the component for importing elsewhere