import React, { useEffect, useState, useRef } from 'react';
import useRequestData from '../hooks/useRequestData';
import Error from './Error';
import { Link } from 'react-router-dom';
import { MdNavigateNext } from "react-icons/md";

const Slider = () => {
  const { data, error, makeRequest } = useRequestData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoplayIntervalRef = useRef(null);

  useEffect(() => {
    makeRequest("http://localhost:5333/slider");
  }, []);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [data]); // Starter autoplay, når data ændres

  const startAutoplay = () => {
    if (data && data.length > 1) {
      autoplayIntervalRef.current = setInterval(() => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % 2); // Skift mellem de to første slides
      }, 5000); // Skift hver 5. sekund
    }
  };

  const stopAutoplay = () => {
    clearInterval(autoplayIntervalRef.current);
  };

  const handlePrevClick = () => {
    setCurrentSlide(prevSlide => (prevSlide - 1 + 2) % 2); // Skift mellem de to første slides
  };

  const handleNextClick = () => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % 2); // Skift mellem de to første slides
  };

  const filteredData = data?.slice(0, 2);

  return (
    <section className='sliderContainer'>
      {error && <Error />}
      <div className="slider">
        {filteredData?.map((item, index) => (
          <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
            <div className="slideContentContainer">
              <div className="overlay"></div>
              <img src={`http://localhost:5333/images/slider/${item.image}`} alt="" />

              <div className="sliderContent">
                <div className="slideText" dangerouslySetInnerHTML={{ __html: item.caption }}></div>
                <Link className='btn sliderButton' to={'/kontakt'}>Kontakt os</Link>
              </div>

            </div>
          </div>
        ))}
      </div>
      <div className="sliderControls">
        <MdNavigateNext onClick={handleNextClick} className='prev' />
        <MdNavigateNext onClick={handleNextClick} className='next' />
      </div>
    </section>
  );
};

export default Slider;
