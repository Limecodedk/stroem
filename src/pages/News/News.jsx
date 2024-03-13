import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import useRequestData from '../../hooks/useRequestData';
import { FaRegComments, FaCalendarAlt } from 'react-icons/fa';
import parse from 'html-react-parser';
import NewsArchive from '../../components/NewsArchive';

const News = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const pathnames = useLocation().pathname.split('/').filter((x) => x);
  const [latestNews, setLatestNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    makeRequest('http://localhost:5333/news');
  }, []);

  useEffect(() => {
    const formatReceivedDate = (dateString) => {
      const options = { day: '2-digit', month: 'short' };
      return new Date(dateString).toLocaleDateString('da-DK', options);
    };

    const sortedData = data?.sort((a, b) => new Date(b.received) - new Date(a.received));
    const latestThreeNews = sortedData
      ?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map((item) => ({
        ...item,
        received: formatReceivedDate(item.received),
        commentsCount: item.comments.length
      }));
    setLatestNews(latestThreeNews);
  }, [data, currentPage, itemsPerPage]);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data?.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <section className="newssection">
      <div>
        <PageHeader title={'Nyheder'} pathnames={pathnames} />
      </div>
      <div className="newsPageContainer">
        <div>
          <div className="newsCardContainer">
            {latestNews?.map((item, index) => (
              <article key={index} className="newsCard">
                <Link to={`/nyhed/${item._id}`}>
                  <div className="newsCardHead">
                    <img src={`http://localhost:5333/images/news/${item.image}`} alt="" />
                    <div className="newsCardDate">
                      <p>{item.received}</p>
                    </div>
                  </div>
                  <div className="newsCardContent">
                    <h2>{item.title}</h2>
                    <div>{parse(item.content.substring(0, 100))}...</div>
                    <div className="newsCardLine"></div>
                    <p>
                      <span className='comments'>
                        <FaRegComments />
                      </span>
                      {item.commentsCount} Kommentar
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className='paginationBtnPrev'>
              Tilbage
            </button>
            {pageNumbers.map((number, index) => (
              <button key={index} onClick={(e) => handleClick(e, number)}>
                {number}
              </button>
            ))}
            <button onClick={handleNextPage} disabled={currentPage === Math.ceil(data?.length / itemsPerPage)} className='paginationBtnNext'>
              Frem
            </button>
          </div>
        </div>
        <aside className="newsArchive">
          <h3>Arkiv:</h3>
          <NewsArchive data={data} />
        </aside>
      </div>
    </section >
  );
};

export default News;
