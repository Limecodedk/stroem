import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useRequestData from '../hooks/useRequestData'
import { Link } from 'react-router-dom';

const HomeSlider = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const sliderRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [animationReset, setAnimationReset] = useState(false);

  useEffect(() => {
    makeRequest("http://localhost:5333/slider")
  }, [])

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0, true);
    }
  }, [data]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    organicArrows: false,
    arrows: false,
    afterChange: (current) => {
      setSlideIndex(current);
      setAnimationReset(true); // Trigger animation reset
    }
  };

  const filteredData = data?.slice(0, 2);

  return (
    <>
      <section className="sliderContainer">
        <Slider ref={sliderRef} {...settings}>
          {filteredData?.map((item, index) => (
            <div key={index} className="slider">
              <div className="sliderImage">
                <div className="overlay"></div>
                <img src={`http://localhost:5333/images/slider/${item.image}`} alt="Slider" />
                <div className={`sliderContent ${animationReset && slideIndex === index ? 'reset-animation' : ''}`} dangerouslySetInnerHTML={{ __html: item.caption }}></div>
              </div>
              <div className="sliderButton">
                <Link to={'/kontakt'} className='btn'>
                  Kontakt os
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </section>

    </>
  )
}

export default HomeSlider;
