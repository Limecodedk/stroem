import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const FaqItem = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  };

  return (
    <div className={`faqItem ${isExpanded ? 'expanded' : ''}`}>
      <div className={`faqQuestion ${isExpanded ? 'faqQuestionExpanded' : ''}`} onClick={handleToggle}>
        {question}
        {isExpanded ? <FaAngleUp className='AngleUp' /> : <FaAngleDown className='AngleDown' />}
      </div>
      {isExpanded && <div className="faqAnswer">
        {answer}
      </div>
      }
    </div>
  )
}

export default FaqItem