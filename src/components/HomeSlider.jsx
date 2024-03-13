import React, { useEffect } from 'react'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useRequestData from '../hooks/useRequestData'
import { Link } from 'react-router-dom';

const HomeSlider = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();

  useEffect(() => {
    makeRequest("http://localhost:5333/slider")
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    organicArrows: false,
    arrows: false,
  };

  const filteredData = data?.slice(0, 2);

  return (
    <>
      <section className="sliderContainer">
        <Slider {...settings}>
          {filteredData?.map((item, index) => (
            <div key={index} className="slider">
              <div className="sliderImage">
                <div className="overlay"></div>
                <img src={`http://localhost:5333/images/slider/${item.image}`} alt="Slider" />
                <div className="sliderContent" dangerouslySetInnerHTML={{ __html: item.caption }}></div>
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

export default HomeSlider