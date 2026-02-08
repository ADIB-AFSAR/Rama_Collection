import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategoryTreeStart } from '../../redux/action/category.action';
import './NaviagtionBar.css'

const NavbarComponent = () => {

  const navigate = useNavigate();

  const categories = useSelector(state => state.category.tree);
  // console.log(categories)

  const [openMenu, setOpenMenu] = useState(null);

  // Detect mobile
  const isMobile = window.innerWidth < 992;

  // Close menu when clicking outside
  useEffect(() => {
    const close = () => setOpenMenu(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const handleOpen = (id) => {
    setOpenMenu(id);
  };

  const handleToggle = (id, e) => {
    e.stopPropagation();

    if (openMenu === id) {
      setOpenMenu(null);
    } else {
      setOpenMenu(id);
    }
  };

  return (

    <nav className="navbar py-0 navbar-expand-lg navbar-light bg-light justify-content-center align-items-center">
<div className='nav-scroll'>
      <ul className="navbar-nav flex-row">

        {categories?.length === 0 ? (<li className='nav-item text-muted'>Loading...</li>):(categories?.map(parent => (

          <li
            key={parent._id}
            className="nav-item dropdown mx-5"

            /* Desktop hover */
            onMouseEnter={!isMobile ? () => handleOpen(parent._id) : null}
            onMouseLeave={!isMobile ? () => setOpenMenu(null) : null}
          >

            {/* Parent */}
            <a
              className="nav-link"
              role="button"

              /* Mobile click */
              onClick={(e) => isMobile && handleToggle(parent._id, e)}
            >
              {parent.name}
            </a>

            {/* Children */}
            <ul
              className={`dropdown-menu ${
                openMenu === parent._id ? "show" : ""
              }`}
            >

              {parent?.children?.map(child => (

                (child?.showInMenu && <li key={child._id}>

                  <a
                    className="dropdown-item px-2 m-1"
                    onClick={() => {
                      navigate(`/collections/${child._id}`);
                      setOpenMenu(null); // close after click
                    }}
                  >
                    {child.name}
                  </a>

                </li>)

              ))}

            </ul>

          </li>

        )))}

      </ul>
</div>
    </nav>

  );
};

export default NavbarComponent;
