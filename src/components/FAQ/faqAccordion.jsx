import React, { useEffect } from 'react'
import FaqItem from '../FAQ/FaqItem';
import useRequestData from '../../hooks/useRequestData'

const FaqAccordion = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();

  useEffect(() => {
    makeRequest("http://localhost:5333/faq")
  }, [])

  return (
    <div className="faqAccordion">
      {data?.map((item, index) => (
        <FaqItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}

export default FaqAccordion