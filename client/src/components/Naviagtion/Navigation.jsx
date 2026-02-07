import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategoryTreeStart } from '../../redux/action/category.action';
import './NaviagtionBar.css'

const NavbarComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector(state => state.category.tree);
  console.log(categories)

  const [openMenu, setOpenMenu] = useState(null);

  // Detect mobile
  const isMobile = window.innerWidth < 992;

  useEffect(() => {
    dispatch(getCategoryTreeStart());
  }, [dispatch]);

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

    <nav className="navbar navbar-expand-lg navbar-light bg-light">

      <ul className="navbar-nav mx-auto">

        {categories?.map(parent => (

          <li
            key={parent._id}
            className="nav-item dropdown mx-3"

            /* Desktop hover */
            onMouseEnter={!isMobile ? () => handleOpen(parent._id) : null}
            onMouseLeave={!isMobile ? () => setOpenMenu(null) : null}
          >

            {/* Parent */}
            <a
              className="nav-link dropdown-toggle"
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

                <li key={child._id}>

                  <a
                    className="dropdown-item px-2 m-1"
                    onClick={() => {
                      navigate(`/collections/${child._id}`);
                      setOpenMenu(null); // close after click
                    }}
                  >
                    {child.name}
                  </a>

                </li>

              ))}

            </ul>

          </li>

        ))}

      </ul>

    </nav>

  );
};

export default NavbarComponent;
