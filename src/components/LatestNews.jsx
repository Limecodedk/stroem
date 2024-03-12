import React, { useEffect, useState } from 'react'
import useRequestData from '../hooks/useRequestData'
import { Link } from 'react-router-dom';

const LatestNews = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    makeRequest("http://localhost:5333/news")
  }, [])

  useEffect(() => {
    const formatReceivedDate = (dateString) => {
      const options = { day: '2-digit', month: 'short' };
      return new Date(dateString).toLocaleDateString('da-DK', options);
    };

    const sortedData = data?.sort((a, b) => new Date(b.received) - new Date(a.received));
    const latestThreeNews = sortedData?.slice(0, 3).map(item => ({ ...item, received: formatReceivedDate(item.received) }));
    setLatestNews(latestThreeNews);
  }, [data]);

  return (
    <section className='latestNewsContainer'>
      <div className='latestNewsHeading'>
        <h2>Sidste <span className='textOrange'>nyt</span></h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium temporibus at quasi commodi.</p>
      </div>
      <div className="newsCardContainer">
        {
          latestNews?.map((item, index) => (
            <div className="newsCard">
              <div className='newsCardHead'>
                <img src={`http://localhost:5333/images/news/${item.image}`} alt="" />
                <div className='newsCardDate'>
                  <p>{item.received}</p>
                </div>
              </div>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
            </div>
          ))
        }
      </div>
      <Link className='btn'>
        Flere nyheder
      </Link>
    </section>
  )
}

export default LatestNews