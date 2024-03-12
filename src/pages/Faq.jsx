import React from 'react'
import FaqAccordion from '../components/FAQ/faqAccordion'
import { useLocation, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';


const Faq = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <section className='faqContainer'>
      <PageHeader title={"FAQ - ofte stillede spørgsmål"} pathnames={pathnames} />
      <FaqAccordion />
    </section>
  )
}

export default Faq