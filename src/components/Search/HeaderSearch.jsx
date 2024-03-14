import React, { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import useRequestData from '../../hooks/useRequestData';
import SearchResult from '../../pages/SearchResultat';
import { useNavigate } from 'react-router-dom'

const HeaderSearch = () => {
  const { makeRequest } = useRequestData();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search.length !== 0) {
      navigate(`/resultat/${search}`);
    }
  };

  return (
    <>
      <div className="searchContainer">
        <div className='searchField'>
          <form >
            <input
              type="text"
              name="search"
              className="search"
              placeholder="Søg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <MdSearch className="searchIcon" onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default HeaderSearch;



/* import React, { useEffect, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import useRequestData from '../../hooks/useRequestData';

const HeaderSearch = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [search, setSearch] = useState('')
  const [searchWord, setSearchWord] = useState('')

  console.log(search)

  useEffect(() => {
    if (search !== '') {
      makeRequest(`http://localhost:5333/search/${search}`);
    }
  }, [search]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (search.length === 7) {
      setSearch(search);
    }
  };

  return (
    <>
      <div className="searchContainer">
        <div className='searchField'>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="search"
              className="search"
              placeholder="Søg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <MdSearch className="searchIcon" />
        </div>
      </div>
    </>
  )
}

export default HeaderSearch */