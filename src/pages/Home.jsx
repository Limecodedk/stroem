import React from 'react'
import HomeSlider from '../components/HomeSlider'
import AboutStroem from '../components/AboutStroem'
import Contact from '../components/Contact'

import OurService from '../components/OurService'
import BookNow from '../components/BookNow'
import Testimonial from '../components/Testimonial'
import OurTeam from '../components/OurTeam'
import LatestNews from '../components/LatestNews'

const Home = () => {
  return (
    <>
      <HomeSlider />
      <AboutStroem />
      <Contact />
      <OurService />
      <BookNow />
      <Testimonial />
      <OurTeam />
      <LatestNews />
    </>
  )
}

export default Home