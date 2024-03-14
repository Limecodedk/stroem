import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useRequestData from '../hooks/useRequestData';
import { Link } from 'react-router-dom';
import Error from './Error';
import Loader from './Loader';

const HomeSlider = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [resetAnimation, setResetAnimation] = useState(false);

  useEffect(() => {
    makeRequest("http://localhost:5333/slider");
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    organicArrows: false,
    arrows: false,
    beforeChange: () => setResetAnimation(true),
    afterChange: () => setResetAnimation(false),
  };

  const filteredData = data?.slice(0, 2);

  return (
    <>
      <section className="sliderContainer">
        {error && <Error />}
        <Slider {...settings}>
          {filteredData?.map((item, index) => (
            <div key={index} className="slider">
              <div className="sliderImage">
                <div className="overlay"></div>
                <img src={`http://localhost:5333/images/slider/${item.image}`} alt="Forside slider" />
                <div className={`sliderContent slideInLeft${resetAnimation ? ' resetAnimation' : ''}`} dangerouslySetInnerHTML={{ __html: item.caption }}></div>
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
  );
};

export default HomeSlider;
