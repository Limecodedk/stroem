import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';

const NewsArchive = ({ data }) => {
  return (
    <article className="newsArchiveCard">
      {data?.slice(4, 8).map((item, index) => (
        <div key={index}>
          <a href={`/nyhed/${item._id}`}>
            <img src={`http://localhost:5333/images/news/${item.image}`} alt="" />
            <p>{item.content.substring(0, 50)}...</p>
            <p><FaCalendarAlt className='newsArchiveIcon' /> {item.received}</p>
          </a>
          <div className="archiveCardLine"></div>
        </div>
      ))}
    </article>
  );
};

export default NewsArchive;
