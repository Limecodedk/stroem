import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useRequestData from '../hooks/useRequestData';
import { MdPlace, MdOutlineAccessTime, MdLocalPhone } from 'react-icons/md';
import { IoIosMenu } from 'react-icons/io';
import Headersearch from '../components/Search/HeaderSearch'

const HeaderNavbar = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [navBar, setNavBar] = useState(false);
  const location = useLocation();

  const handleNavbarToggle = () => {
    setNavBar(!navBar);
  };

  useEffect(() => {
    makeRequest('http://localhost:5333/contactinformation');
  }, []);

  const myMenu = [
    {
      title: 'Foride',
      link: '/',
    },
    {
      title: 'Om os',
      link: '/omos',
    },
    {
      title: 'Service',
      link: '/service',
    },
    {
      title: 'FAQ',
      link: '/faq',
    },
    {
      title: 'Nyheder',
      link: '/nyheder',
    },
    {
      title: 'Kontakt os',
      link: '/kontakt',
    },
  ];

  return (
    <>
      <div className='navbarContainer'>
        <nav className={navBar ? 'navBar activeNav' : 'navBar'}>
          <div className="menuIcon" onClick={handleNavbarToggle}>
            <IoIosMenu />
          </div>
          <ul>
            {myMenu.map((item, index) => (
              <li key={index} className={location.pathname === item.link ? 'activeNav' : ''}>
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="searchContainer">
          <Headersearch />
        </div>
      </div>
    </>
  )
}

export default HeaderNavbar