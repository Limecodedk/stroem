import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useRequestData from '../hooks/useRequestData';
import { MdPlace, MdOutlineAccessTime, MdLocalPhone } from 'react-icons/md';
import { IoIosMenu } from 'react-icons/io';
import Headersearch from '../components/Search/HeaderSearch'

const Header = () => {
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
      <header className="headerContainer">
        <div className="headerTopbar">
          <div className="logo">
            <img src="/public/asssets/logo.png" alt="" />
          </div>
          <div className="contact">
            <p>
              <span className="contactIcon">
                <MdPlace />
              </span>
              {data?.address}
            </p>
            <p>
              <span className="contactIcon">
                <MdOutlineAccessTime />
              </span>
              {data?.openinghours}
            </p>
            <Link to={'tel:' + data?.phone}>
              <span className="contactIcon">
                <MdLocalPhone />
              </span>
              {data?.phone}
            </Link>
          </div>
        </div>
        <nav className={navBar ? 'navBar active' : 'navBar'}>
          <div className="menuIcon" onClick={handleNavbarToggle}>
            <IoIosMenu />
          </div>
          <ul>
            {myMenu.map((item, index) => (
              <li key={index} className={location.pathname === item.link ? 'active' : ''}>
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
          <Headersearch />
        </nav>
      </header>
    </>
  );
};

export default Header;
