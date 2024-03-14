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
    if (search.length !== '') {
      navigate(`/resultat/${search}`);
    }
  };

  return (
    <>
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
    </>
  );
};

export default HeaderSearch;