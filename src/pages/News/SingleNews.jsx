import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import useRequestData from '../../hooks/useRequestData';
import { FaRegComments, FaCalendarAlt } from 'react-icons/fa';

const SingleNews = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const { data: dataAll, isLoading: isLoadingAll, error: errorAll, makeRequest: makeRequestAll } = useRequestData()
  const { id } = useParams();
  const pathnames = useLocation().pathname.split('/').filter((x) => x);
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedComments, setFormattedComments] = useState([]);

  useEffect(() => {
    makeRequest("http://localhost:5333/news/" + id);
    makeRequestAll("http://localhost:5333/news/");
  }, []);


  useEffect(() => {
    const formatReceivedDate = (dateString) => {
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('da-DK', options);
    };

    if (data && data.received) {
      const formatted = formatReceivedDate(data.received);
      setFormattedDate(formatted);
    }

    if (data && data.comments) {
      const formattedComments = data.comments.map((comment) => {
        return {
          ...comment,
          received: formatReceivedDate(comment.received)
        };
      });
      setFormattedComments(formattedComments);
    }
  }, [data]);

  return (
    <section className='singleNewsContainer'>
      <div>
        <PageHeader title={data?.title} pathnames={pathnames} />
      </div>
      <div className="singleNewsArticleContainer">
        <article className='singleNewsArticle'>
          <div className='singleNewsArticleContent'>
            <div className="SingleNewshead">
              <img src={`http://localhost:5333/images/news/${data?.image}`} alt="" />
              <div className="newsDate">
                <p>{formattedDate}</p>
              </div>
            </div>
            <div className="singleNewsBody">
              <p>
                <span className='comments'>
                  <FaRegComments />
                </span>
                2 Kommentar
              </p>
              <h2>{data?.title}</h2>
              <div className='line'></div>
              <p>{data?.content}</p>
            </div>
          </div>
          {/* Kommentar */}
          <div className="commentsField">
            <h2>Kommentar(2)</h2>
            {formattedComments.map((item, index) => (
              <div className="comments" key={index}>
                <h3>{item.name}</h3>
                <p><FaCalendarAlt className='newsArchiveIcon' /> {item.received}</p>
                <p>{item.comment}</p>
              </div>
            ))}
          </div>
          <h2>Skriv en kommentar</h2>
          <form className='singleNewsCommentsForm'>
            <div>
              <input type="text" name="name" placeholder='Navn' />
              <input type="email" name="email" placeholder='Email' />
            </div>
            <textarea name="comments" id="" cols="30" rows="10"></textarea>
            <button type="submit" className='btn'>Send Besked</button>
          </form>
        </article>
        <aside className="newsArchive">
          <h3>Arkiv:</h3>
          <article className="newsArchiveCard">
            {dataAll
              ?.slice(4, 8).map((item, index) => (
                <div key={index}>
                  <Link to={'/'}>
                    <img src={`http://localhost:5333/images/news/${item.image}`} alt="" />
                    <p>{item.content.substring(0, 50)}...</p>
                    <p><FaCalendarAlt className='newsArchiveIcon' /> {item.received}</p>
                  </Link>
                  <div className="archiveCardLine"></div>
                </div>
              ))}
          </article>
        </aside>
      </div>
    </section>
  );
};

export default SingleNews;