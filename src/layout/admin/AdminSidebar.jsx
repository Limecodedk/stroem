import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaRegNewspaper, FaCalendarCheck, FaPortrait, FaUser, FaChevronDown } from 'react-icons/fa';

const AdminSidebar = () => {

  const [showNewsSubMenu, setShowNewsSubMenu] = useState(false);
  const [showAccountSubMenu, setShowAccountSubMenu] = useState(false);

  const toggleNewsSubMenu = () => {
    setShowNewsSubMenu(!showNewsSubMenu);
    setShowAccountSubMenu(false);
  };

  const toggleAccountSubMenu = () => {
    setShowAccountSubMenu(!showAccountSubMenu);
    setShowNewsSubMenu(false);
  };

  const mynav = [
    {
      "title": "Home",
      "to": "/admin",
      "icon": <FaHome />
    },
    {
      "title": "Nyhed",
      "to": "/admin/news",
      "icon": <FaRegNewspaper />,
      "submenu": [
        {
          "title": "Alle nyheder",
          "to": "/admin/news"
        },
        {
          "title": "Opret nyhed",
          "to": "/admin/news/create"
        }
      ]
    },
    {
      "title": "Om os",
      "to": "/admin/about",
      "icon": <FaPortrait />
    },
    {
      "title": "Booking",
      "to": "/admin/booking",
      "icon": <FaCalendarCheck />
    },
    {
      "title": "Account",
      "to": "/admin",
      "icon": <FaUser />,
      "submenu": [
        {
          "title": "My Account",
          "to": "/admin",
        },
        {
          "title": "Log ud",
          "to": "/",
        }
      ]
    },
  ];

  return (
    <aside className='adminSideBarContainer'>
      <header className="adminSideBarLogo">
        <Link to={'/'}>
          <img src="/public/asssets/logo.png" alt="Stroem logo" />
          <p>Hey Admin!</p>
        </Link>
      </header>
      <nav className='adminSideBarNav'>
        <ul>
          {mynav.map((item, index) => (
            <li key={index}>
              {item.submenu ? (
                <div>
                  <span className="menuTitle" onClick={(e) => {
                    e.preventDefault();
                    if (item.title === "Nyhed") toggleNewsSubMenu();
                    else if (item.title === "Account") toggleAccountSubMenu();
                  }}>
                    <span className="menuIcon">{item.icon}</span>
                    {item.title}
                    {item.submenu && <FaChevronDown className='subMenuIcon' />}
                  </span>
                </div>
              ) : (
                <Link to={item.to}>
                  <span className="menuIcon">{item.icon}</span>
                  {item.title}
                </Link>
              )}
              {item.submenu && ((item.title === "Nyhed" && showNewsSubMenu) ||
                (item.title === "Account" && showAccountSubMenu)) && (
                  <ul>
                    {item.submenu.map((subitem, subindex) => (
                      <li key={subindex}>
                        <Link to={subitem.to}>{subitem.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
