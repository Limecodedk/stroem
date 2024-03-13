import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { useLocation } from 'react-router-dom';
import useRequestData from '../hooks/useRequestData';
import { MdPlace, MdEmail, MdLocalPhone } from "react-icons/md";
const ContactUs = () => {
  const pathnames = useLocation().pathname.split('/').filter((x) => x);
  const { data, isLoading, error, makeRequest } = useRequestData();
  const { data: dataPost, isLoading: isLoadingPost, error: errorPost, makeRequest: makeRequestPost } = useRequestData();
  const [message, setMessage] = useState('');

  useEffect(() => {
    makeRequest('http://localhost:5333/contactinformation');
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let fd = new FormData(event.target)
    await makeRequestPost("http://localhost:5333/contact",
      {
        "Content-Type": "multipart/form-data"
      }, null, "POST", fd
    )
  }

  useEffect(() => {
    if (dataPost && dataPost.oprettet) {
      console.log('oprettet')
      setMessage('Tak for din besked')
    } else {
      setMessage('Noget gik galt')
    }
  }, [dataPost])

  return (
    <section className='contactSection'>
      <div>
        <PageHeader title={'Kontakt os'} pathnames={pathnames} />
      </div>
      <div className='contactInfoContainer'>
        <div className='contactInfo'>
          <div className='contactIcon'>
            <MdPlace />
          </div>
          <div>
            <h3>Adresse</h3>
            <p>{data?.address}</p>
          </div>
        </div>
        <div className='line'></div>
        <div className='contactInfo'>
          <div className='contactIcon'>
            <MdLocalPhone />
          </div>
          <div>
            <h3>Telefon</h3>
            <p></p>
            <a href={`tel:${data?.phone}`}>
              {data?.phone}
            </a>
          </div>
        </div>
        <div className='line'></div>
        <div className='contactInfo'>
          <div className='contactIcon'>
            <MdEmail />
          </div>
          <div>
            <h3>email</h3>
            <a href={`mailto:${data?.email}`}>{data?.email}</a>
          </div>
        </div>
      </div>
      <div className="contactFormContainer" onSubmit={e => handleSubmit(event)}>
        <div className='contact'>
          <h2>Kontakt os</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio voluptatem totam ab obcaecati dolorem, doloremque quia impedit!</p>
          {dataPost && dataPost && dataPost.oprettet && (
            <p className='textOrange'>{message}</p>
          )}
          <form className="contactForm" >
            <div className='contactFormContainer'>
              <div className='contactFormInput'>
                <input type="text" name="name" placeholder='Dit Navn' />
                <input type="email" name="email" placeholder='Din Email' />
                <input type="tel" name="phone" placeholder='Telefon nr.' />
              </div>
              <div>
                <textarea name="message" id="" cols="30" rows="10" placeholder='Din besked..'></textarea>
              </div>
            </div>
            <button type="submit" className='btn'>Send besked</button>
          </form>
        </div>
        <div className='contactMap'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1312.668090753371!2d10.885785283407685!3d56.405102491233436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sstr%C3%B8mparken%201%208500%20gren%C3%A5!5e0!3m2!1sda!2sdk!4v1710279875461!5m2!1sda!2sdk" className='GoogleMap' loading="lazy" ></iframe>
        </div>
      </div>

    </section>
  )
}

export default ContactUs