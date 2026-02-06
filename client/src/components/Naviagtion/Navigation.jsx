import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getCategoryTreeStart } from '../../redux/action/category.action';

const NavbarComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector(state => state.category.tree);

  useEffect(() => {
    dispatch(getCategoryTreeStart());
  }, [dispatch]);

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">

      <ul className="navbar-nav mx-auto">

        {categories?.map(parent => (

          <li
            key={parent._id}
            className="nav-item dropdown mx-4"
          >

            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              {parent.name}
            </a>


            <ul className="dropdown-menu">

              {parent.children?.map(child => (

                <li key={child._id}>

                  <a
                    className="dropdown-item"
                    onClick={() =>
                      navigate(`/collections/${child._id}`)
                    }
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
