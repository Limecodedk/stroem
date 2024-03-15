import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import useRequestData from '../hooks/useRequestData'
import { FaTwitter, FaVimeo, FaLinkedin, FaFacebook } from 'react-icons/fa';
import Error from '../components/Error'

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
];

const Footer = () => {

  const { data, error, makeRequest } = useRequestData();
  const { data: dataSubscrip, error: errorSubscrip, makeRequest: makeRequestSubscrip } = useRequestData();
  const [message, setMessage] = useState('');
  const date = new Date();
  const year = date.getFullYear();
  const renderIcon = (iconName) => {
    switch (iconName) {
      case "fa-twitter":
        return <FaTwitter />;
      case "fa-vimeo":
        return <FaVimeo />;
      case "fa-linkedin":
        return <FaLinkedin />;
      case "fa-facebook":
        return <FaFacebook />;
      default:
        return null;
    }
  };

  useEffect(() => {
    makeRequest("http://localhost:5333/contactinformation")
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    let fd = new FormData(event.target)
    await makeRequestSubscrip("http://localhost:5333/newssubscription",
      {
        "Content-Type": "multipart/form-data"
      }, null, "POST", fd
    )
  }

  useEffect(() => {
    if (dataSubscrip && dataSubscrip.oprettet) {
      console.log('oprettet')
      setMessage('Tak du er nu timeldt vores nyhedsbrev')
    } else {
      setMessage('Noget gik galt')
    }
  }, [dataSubscrip])

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <footer className='footerContainer'>
        <div className="footerContent">
          {error && <Error />}
          <div>
            <img src="/public/asssets/logo.png" alt="" />
            <p>Som medlem af Elinstallatørernes Landsorganisation, ELFO, er vi tilsuttet et ankernævn og en garantiordning</p>
          </div>
          <div>
            <h3>Link</h3>
            {myMenu?.map((item, index) => (
              <ul key={index}>
                <li>
                  <Link to={item.link}>
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
            {dataSubscrip && dataSubscrip.oprettet ? (
              <p className='textOrange'>{message}</p>
            ) : (
              <>
                <p>Tilmeld dig vores nyhedsbrev her</p>
                <form onSubmit={event => handleSubmit(event)}>
                  <input type="email" name="email" placeholder='Din Email' required />
                  <button type="submit" className='btn effect2'>Tilmeld</button>
                </form>
              </>
            )}
          </div>
          <div className='footerCopyrigt'>
            <p>
              <span className='textOrange'>Strøm</span>
              &copy; {year} 2017 All Right Reserved
            </p>
          </div>
          <div className='footerSocial'>
            {data?.some.map((item, index) => (
              <a href={item.link} key={index} target="_blank" >
                <i className='socialMedia'>{renderIcon(item.icon)}</i>
              </a>
            ))}
          </div>
        </div>
        <div className="backToTop btn" onClick={handleScrollToTop}>
          &#10092;
        </div>
      </footer >

    </>
  )
}

export default Footer;