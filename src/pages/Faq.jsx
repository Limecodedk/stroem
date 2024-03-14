import React from 'react'
import FaqAccordion from '../components/FAQ/faqAccordion'
import { useLocation, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Loader from '../components/Loader'
import { useLoader } from '../context/LoaderContext'

const Faq = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const { loading } = useLoader();

  return (
    <>
      {loading && <Loader />}
      <section className='faqContainer'>
        <PageHeader title={"FAQ - ofte stillede spørgsmål"} pathnames={pathnames} />
        <FaqAccordion />
      </section>
    </>
  )
}

export default Faq