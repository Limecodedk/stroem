import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useRequestData from '../hooks/useRequestData'
import Error from './Error'
import Loader from './Loader'

const AboutStroem = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();

  useEffect(() => {
    makeRequest("http://localhost:5333/about")
  }, [])

  return (
    <>
      <article className='AboutSection'>
        {error && <Error />}
        <h2>{data?.title}</h2>
        <p>
          {data?.teaser}
        </p>
        <Link to={'/'} className='btn effect1'>
          Læs mere
        </Link>
      </article>
    </>
  )
}

export default AboutStroem