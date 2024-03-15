import React, { useEffect, useState } from 'react';
import useRequestData from '../hooks/useRequestData';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Error from './Error';


const OurTeam = () => {
  const { data, error, makeRequest } = useRequestData();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    makeRequest('http://localhost:5333/team');
  }, []);

  return (
    <section className='teamContainer'>
      {error && <Error />}
      <div className='teamHeading'>
        <h2>Vores <span className='textOrange'>team</span></h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia voluptatibus dignissimos aliquam.</p>
      </div>
      <div className='teamPeople'>
        {data?.map((item, index) => (
          <div className='teamPerson' key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
            <img src={`http://localhost:5333/images/team/${item.image}`} alt='Billeder af vores medarbejder' />
            <div className={`teamContent ${hoveredIndex === index ? 'active' : ''}`}>
              <h2>{item.name}</h2>
              <p>{item.title}</p>
              <div className='teamSocial'>
                <Link to={'/'}>
                  <FaFacebookF />
                </Link>
                <Link to={'/'}>
                  <FaTwitter />
                </Link>
                <Link to={'/'}>
                  <FaLinkedinIn />
                </Link>
                <Link to={'/'}>
                  <FaPinterestP />
                </Link>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
