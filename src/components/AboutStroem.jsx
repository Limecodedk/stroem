import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useRequestData from '../hooks/useRequestData'

const AboutStroem = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();

  useEffect(() => {
    makeRequest("http://localhost:5333/about")
  }, [])



  return (
    <section className='AboutSection'>
      <h2>{data?.title}</h2>
      <p>
        {data?.teaser}
      </p>
      <Link to={'/'} className='btn'>
        Læs mere
      </Link>
    </section>
  )
}

export default AboutStroem