import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import useRequestData from '../hooks/useRequestData'


const Footer = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const date = new Date();
  const year = date.getFullYear();

  useEffect(() => {

    makeRequest("http://localhost:5333/contactinformation")

  }, [])

  const myMenu = [
    {
      "title": "> Foride",
      "link": "/"
    },
    {
      "title": "> Om os",
      "link": "/omos"
    },
    {
      "title": "> Service",
      "link": "/service"
    },
    {
      "title": "> FAQ",
      "link": "/faq"
    },
    {
      "title": "> Nyheder",
      "link": "/nyheder"
    },
    {
      "title": "> Kontakt os",
      "link": "/kontakt"
    }
  ]

  return (
    <>
      <footer className='footerContainer'>
        <div className="footerContent">

          <div>
            <img src="/public/asssets/logo.png" alt="" />
            <p>Som medlem af Elinstallatørernes Landsorganisation, ELFO, er vi tilsuttet et ankernævn og en garantiordning</p>
          </div>
          <div>
            <h3>Link</h3>
            {myMenu.map((item, index) => (
              <ul key={index}>
                <li>
                  <Link to={item.title}>
                    {item.title}
                  </Link>
                </li>
              </ul>
            ))}
          </div>
          <div>
            <h3>Kontakt os</h3>
            <p>Adresse: {data?.adress}</p>
            <p>Telefon:
              <Link to={'tel:' + data?.phone}>
                {data?.phone}
              </Link></p>
            <p>Mail: <Link to={'mailto:' + data?.email}>
              {data?.email}
            </Link></p>
          </div>
          <div>
            <h3>Nyhedsbrev</h3>
            <p>Tilmeld dig vores nyhedsbrev her</p>
            <form action="">
              <input type="email" name="newsSubscription" placeholder='Din Email' required />
              <button type="submit" className='btn'>Tilmeld</button>
            </form>
          </div>


          <div className='footerCopyrigt'>
            <p>
              <span className='textOrange'>Strøm</span>
              &copy; {year} 2017 All Right Reserved
            </p>
          </div>

          <div className='footerSocial'>
            {data?.some.map((item, index) => (
              <span key={index}>
                {item.icon}
              </span>


            ))}
          </div>
        </div>
      </footer >

    </>
  )
}

export default Footer;