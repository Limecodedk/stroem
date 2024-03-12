import React, { useEffect, useState } from 'react';
import useRequestData from '../hooks/useRequestData';

const Testimonial = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();

  useEffect(() => {
    makeRequest("http://localhost:5333/testimonial");
  }, []);

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [startX, setStartX] = useState(0);
  const [clicked, setClicked] = useState(false);

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setClicked(true);
  };

  const handleMouseMove = (e) => {
    if (clicked) {
      const diff = startX - e.clientX;
      if (Math.abs(diff) > 100) { // Minimum distance required for swipe
        if (diff > 0) { // Swipe left
          nextTestimonial();
        } else { // Swipe right
          prevTestimonial();
        }
        setStartX(0); // Reset startX after swipe
        setClicked(false); // Reset clicked state
      }
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((currentTestimonial + 1) % (data.length || 1)); // Ensure data.length exists
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((currentTestimonial - 1 + (data.length || 1)) % (data.length || 1)); // Ensure data.length exists
  };

  return (
    <section className='testimonialSection' onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>
      <div className='testimonialbg'>
        <div className="overlay"></div>
        <div className='testimonialbgImage'>
          <img src="/public/asssets/backgroundimage.jpg" alt="" />
        </div>
      </div>
      <div className='testimonialheading'>
        <h2>Vores <span>kunder siger</span></h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque nostrum quaerat dolor?</p>
      </div>

      <div className="testimonialSlider">
        {data?.slice(currentTestimonial, currentTestimonial + 3).map((item, index) => (
          <div key={index} className={`testimonialCard ${index === 1 ? 'active' : ''}`}>
            <img src={`http://localhost:5333/images/testimonial/${item.image}`} alt="" />

            <div className='sliderContent'>
              <h3>{item.name}</h3>
              <p className='textOrange'>{item.title}</p>
              <p>{item.review}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default Testimonial;
