import React, { useEffect, useState } from 'react';
import useRequestData from '../hooks/useRequestData';
import Error from './Error';

const Testimonial = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    makeRequest("http://localhost:5333/testimonial");
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
      if (Math.abs(diff) > 100) {
        if (diff > 0) {
          nextTestimonial();
        } else {
          prevTestimonial();
        }
        setStartX(0);
        setClicked(false);
      }
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((currentTestimonial + 1) % (data.length || 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((currentTestimonial - 1 + (data.length || 1)) % (data.length || 1));
  };

  // Beregn antallet af testimonials baseret på skærmstørrelsen
  const testimonialsToShow = windowWidth > 425 ? 3 : 1;

  return (
    <section className='testimonialSection' onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onTouchMove={handleMouseMove}>
      {error && <Error />}
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
        {data?.slice(currentTestimonial, currentTestimonial + testimonialsToShow).map((item, index) => (
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
