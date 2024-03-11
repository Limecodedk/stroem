import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import useRequestData from '../hooks/useRequestData'
import { MdPlace, MdOutlineAccessTime, MdLocalPhone } from "react-icons/md";

const Header = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();

  useEffect(() => {

    makeRequest("http://localhost:5333/contactinformation")

  }, [])

  const myMenu = [
    {
      "title": "Foride",
      "link": "/"
    },
    {
      "title": "Om os",
      "link": "/omos"
    },
    {
      "title": "Service",
      "link": "/service"
    },
    {
      "title": "FAQ",
      "link": "/faq"
    },
    {
      "title": "Nyheder",
      "link": "/nyheder"
    },
    {
      "title": "Kontakt os",
      "link": "/kontakt"
    }
  ]

  return (
    <>
      <header className='headerContainer'>
        <div className='headerTopbar'>
          <div className="logo">
            <img src="/public/asssets/logo.png" alt="" />
          </div>
          <div className='contact'>
            <p><span className='contactIcon'><MdPlace /></span>{data?.address}</p>
            <p><span className="contactIcon"><MdOutlineAccessTime /></span>{data?.openinghours}</p>
            <Link to={'tel:' + data?.phone}>
              <span className="contactIcon"><MdLocalPhone /></span>{data?.phone}
            </Link>
          </div>
        </div>
        <nav className='navBar'>
          {myMenu.map((item, index) => (
            <ul key={index}>
              <li>
                <Link to={item.link}>
                  {item.title}
                </Link>
              </li>
            </ul>
          ))}
          <div>
            <input type="text" name="search" placeholder='Søg' />
          </div>
        </nav>
      </header>

    </>
  )
}

export default Header;