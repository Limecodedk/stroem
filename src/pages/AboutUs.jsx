import React, { useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import { Link, useLocation } from 'react-router-dom';
import useRequestData from '../hooks/useRequestData';
import OurTeam from '../components/OurTeam';
import Testimonial from '../components/Testimonial';

const AboutUs = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const pathnames = useLocation().pathname.split('/').filter((x) => x);

  useEffect(() => {
    makeRequest('http://localhost:5333/about');
  }, []);

  return (
    <section className='aboutSection'>
      <div>
        <PageHeader title={'Om os'} pathnames={pathnames} />
      </div>
      <div className='aboutHeader'>
        <h1>{data?.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data?.teaser }}></div>
      </div>
      <div className="aboutContainer">
        <div className="aboutContent">
          <div className='aboutText'>
            <div dangerouslySetInnerHTML={{ __html: data?.content }}></div>
            <Link to={'/kontakt'} className='btn effect1'>
              Kontakt os
            </Link>
          </div>
        </div>
        <div className="aboutImage">
          <img src={`http://localhost:5333/images/about/${data?.image}`} alt="" />
        </div>
      </div>
      <Testimonial />
      <OurTeam />


    </section>
  )
}

export default AboutUs