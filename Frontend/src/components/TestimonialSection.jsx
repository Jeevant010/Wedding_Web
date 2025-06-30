import React from 'react';
import '../styles/TestimonialSection.css';

export const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "John & Sarah",
      image: "https://images.unsplash.com/photo-1529636444744-adffc9135a5e?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      quote: "Our wedding film exceeded all expectations. They captured moments we didn't even notice on the day, and now we can relive them forever.",
      role: "Beach Wedding"
    },
    {
      id: 2,
      name: "Priya & Rahul",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      quote: "Their attention to detail and ability to capture the essence of our traditional ceremony while keeping a modern touch was remarkable.",
      role: "Traditional Wedding"
    },
    {
      id: 3,
      name: "Emma & James",
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      quote: "The team was unobtrusive yet captured all the special moments. Our garden wedding film feels like a professional movie!",
      role: "Garden Wedding"
    },
    {
      id: 4,
      name: "Michael & David",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      quote: "They made us feel completely comfortable and captured our love story in such a genuine way. The final video makes us cry every time.",
      role: "City Wedding"
    },
    {
      id: 5,
      name: "Aisha & Omar",
      image: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      quote: "Working with this team was a dream. They respected our cultural traditions while creating a stunning wedding film we'll cherish forever.",
      role: "Cultural Wedding"
    },
    {
      id: 6,
      name: "Sophia & Thomas",
      image: "https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      quote: "From our first meeting to receiving the final film, the service was exceptional. They truly understand how to tell a couple's unique story.",
      role: "Rustic Wedding"
    }
  ];

  return (
    <div className="testimonial-section">
      <div className="testimonial-header">
        <h2>What Our Couples Say</h2>
        <p className="subtitle">Real experiences from the couples whose special days we've captured</p>
      </div>
      
      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <div className="testimonial-card" key={testimonial.id}>
            <div className="testimonial-quote-box">
              <svg className="quote-icon" width="36" height="36" viewBox="0 0 24 24" fill="#e6e4e1">
                <path d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" />
              </svg>
              <p className="testimonial-text">{testimonial.quote}</p>
            </div>
            
            <div className="testimonial-person">
              <div className="testimonial-image-container">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="testimonial-image"
                />
              </div>
              <div className="testimonial-info">
                <h4 className="testimonial-name">{testimonial.name}</h4>
                <p className="testimonial-role">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;