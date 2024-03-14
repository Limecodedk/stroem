import React, { useEffect } from 'react'
import useRequestData from '../hooks/useRequestData'
import '../styles/flaticon.css'
import Error from './Error'
import Loader from './Loader'


const OurService = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();

  useEffect(() => {
    makeRequest("http://localhost:5333/service")
  }, [])

  return (
    <>
      {error && <Error />}
      <section className='OurServiceContainer'>
        <div className='serviceGrid'>
          <div className='serviceAllCol'>
            <h2>Vores <span>Services</span></h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam error incidunt.
          </div>
          {data?.map((item, index) => (
            <div key={index} className='serviceItem'>
              <i className={`flaticon ${item.icon}`}></i>
              <div>
                <h3>{item.title}</h3>
                <p>{item.teaser}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='serviceWomen'>
          <img src="/public/asssets/1.png" alt="" />
        </div>

      </section>

    </>
  )
}

export default OurService