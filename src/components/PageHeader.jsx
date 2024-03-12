import React from 'react'
import { Link } from 'react-router-dom';

const PageHeader = ({ title, pathnames }) => {
  return (
    <div className="headingContainer">
      <div className="heading">
        <h1>{title}</h1>
        <nav aria-label="breadcrumbs" className='breadcrumbs'>
          <ul>
            <li>
              <Link to="/">Forside &gt;</Link>
            </li>
            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;
              return (
                <li key={name}>
                  {isLast ? (
                    <span className='textOrange'>{name}</span>
                  ) : (
                    <Link to={routeTo}>{name}</Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>

  );
}

export default PageHeader