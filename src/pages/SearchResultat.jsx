import React, { useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import useRequestData from '../hooks/useRequestData';
import Error from '../components/Error';
import Loader from '../components/Loader'
import { useLoader } from '../context/LoaderContext'
import PageHeader from '../components/PageHeader';

const SearchResult = () => {
  const { loading } = useLoader();
  const { data, error, makeRequest } = useRequestData();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const { id } = useParams()

  useEffect(() => {
    makeRequest(`http://localhost:5333/search/${id}`);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <section>
        {error && <Error />}
        <div className="heading">
          <PageHeader title={"Søgeresultat"} pathnames={pathnames} />
        </div>
        {data && (
          <div className='SearchResultContent'>
            <div>
              <h2>Nyheder:</h2>
              {data.searchresult.news.length === 0 ? (
                <p>Ingen resultater fundet</p>
              ) : (
                data.searchresult.news.map((item, index) => (
                  <div key={index} className='resultCard'>
                    <Link to={`/nyhed/${item._id}`}>
                      <h3>{item.title}</h3>
                    </Link>
                    <div className='newsResultContentContainer'>
                      <div>
                        <p>{item.content}</p>
                        <Link className='btn' to={`/nyhed/${item._id}`}>
                          Læs mere
                        </Link>
                      </div>
                      <div>
                        <img src={`http://localhost:5333/images/news/${item.image}`} alt={item.title} />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className='resultServices'>
              <h2>Service:</h2>
              {data.searchresult.services.length === 0 ? (
                <p>Ingen resultater fundet</p>
              ) : (
                data.searchresult.services.map((item, index) => (
                  <div key={index} className='resultCard serviceCard'>
                    <Link className='' to={'/service/'}>
                      <p>{item.title}</p>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </section >
    </>
  );
};

export default SearchResult;