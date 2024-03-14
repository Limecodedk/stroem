import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';
import parse from 'html-react-parser';

const NewsArchive = ({ data }) => {
  const [formattedDates, setFormattedDates] = useState([]);

  useEffect(() => {
    const formatReceivedDate = (dateString) => {
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('da-DK', options);
    };

    if (data && data.length > 0) {
      const formatted = data.map(item => formatReceivedDate(item.received));
      setFormattedDates(formatted);
    }

  }, [data]);

  return (
    <article className="newsArchiveCard">
      {data?.slice(4, 8).map((item, index) => (
        <div key={index}>
          <a href={`/nyhed/${item._id}`}>
            <img src={`http://localhost:5333/images/news/${item.image}`} alt={item.title} />
            <div>{parse(item.content.substring(0, 50))}...</div>
            <p><FaCalendarAlt className='newsArchiveIcon' /> {formattedDates[index]}</p>
          </a>
          <div className="archiveCardLine"></div>
        </div>
      ))}
    </article>
  );
};

export default NewsArchive;
