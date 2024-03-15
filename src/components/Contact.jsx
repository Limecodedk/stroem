import React from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <>
      <section className='contactusSection'>
        <h2>Skal du bruge <span className='textOrange'>hjælp</span> fra <span className="textOrange">Strøm?</span></h2>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
        <Link className='btn effect2'>
          Kontakt os
        </Link>
      </section>
    </>
  )
}

export default Contact