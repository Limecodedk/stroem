import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import useRequestData from '../../hooks/useRequestData';
import { FaRegComments, FaCalendarAlt } from 'react-icons/fa';
import NewsArchive from '../../components/NewsArchive';


const SingleNews = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const { data: dataAll, isLoading: isLoadingAll, error: errorAll, makeRequest: makeRequestAll } = useRequestData();
  const { data: dataComments, isLoading: isLoadingComments, error: errorComments, makeRequest: makeRequestComments } = useRequestData();
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


  const handleSubmit = async (event) => {
    event.preventDefault()
    let fd = new FormData(event.target)
    await makeRequestComments("http://localhost:5333/news/comment/" + id,
      {
        "Content-Type": "multipart/form-data"
      }, null, "POST", fd
    )
  }

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
                {data?.comments.length} Kommentar
              </p>
              <h2>{data?.title}</h2>
              <div className='line'></div>
              <div dangerouslySetInnerHTML={{ __html: data?.content }}></div>
            </div>
          </div>
          <div className="commentsField">
            <h2>Kommentar({data?.comments.length})</h2>
            {formattedComments.map((item, index) => (
              <div className="comments" key={index}>
                <h3>{item.name}</h3>
                <p><FaCalendarAlt className='newsArchiveIcon' /> {item.received}</p>
                <p>{item.comment}</p>
              </div>
            ))}
          </div>
          <h2>Skriv en kommentar</h2>
          <form className='singleNewsCommentsForm' onSubmit={e => handleSubmit(e)}>
            <div>
              <input type="text" name="name" placeholder='Navn' required />
              <input type="email" name="email" placeholder='Email' required />
            </div>
            <textarea name="comment" id="" cols="30" rows="10" required></textarea>
            <button type="submit" className='btn effect2'>Send Besked</button>
          </form>
        </article>
        <aside className="newsArchive">
          <h3>Arkiv:</h3>
          <NewsArchive data={dataAll} />
        </aside>
      </div>
    </section>
  );
};

export default SingleNews;
