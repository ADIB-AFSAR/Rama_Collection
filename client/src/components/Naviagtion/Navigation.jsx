import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NaviagtionBar.css'; // Corrected typo in file name
import SlidingInfo from '../SlidingInfo/SlidingInfo';

const NavbarComponent = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Function to toggle dropdown on mobile and close other dropdowns if open
  const handleDropdownClick = (event, dropdownId) => {
    event.preventDefault();

    if (window.innerWidth < 992) {
      setActiveDropdown((prev) => (prev === dropdownId ? null : dropdownId));
    }
  };

  return (
    <>
    <SlidingInfo/>
    <nav className="navbar navbar-expand-lg navbar-light bg-light custom-navbar">
      <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
        <ul className="navbar-nav d-flex flex-row">
          <li className="nav-item dropdown mx-5">
            <a
              className="nav-link"
              href="#"
              id="sareeDropdown"
              onClick={(e) => handleDropdownClick(e, 'sareeDropdown')}
            >
              Saree
            </a>
            <div
              className={`dropdown-menu custom-dropdown-menu ${activeDropdown === 'sareeDropdown' ? 'show' : ''}`}
            >
              <a className="dropdown-item" href="#">Silk Saree</a>
              <a className="dropdown-item" href="#">Cotton Saree</a>
              <a className="dropdown-item" href="#">Designer Saree</a>
            </div>
          </li>
          <li className="nav-item dropdown mx-5">
            <a
              className="nav-link"
              href="#"
              id="dressMaterialDropdown"
              onClick={(e) => handleDropdownClick(e, 'dressMaterialDropdown')}
            >
              Dress Material
            </a>
            <div
              className={`dropdown-menu custom-dropdown-menu ${activeDropdown === 'dressMaterialDropdown' ? 'show' : ''}`}
            >
              <a className="dropdown-item" href="#">Cotton Dress Material</a>
              <a className="dropdown-item" href="#">Silk Dress Material</a>
              <a className="dropdown-item" href="#">Printed Dress Material</a>
            </div>
          </li>
          <li className="nav-item dropdown mx-5">
            <a
              className="nav-link"
              href="#"
              id="salwarSuitDropdown"
              onClick={(e) => handleDropdownClick(e, 'salwarSuitDropdown')}
            >
              Salwar Suit
            </a>
            <div
              className={`dropdown-menu custom-dropdown-menu ${activeDropdown === 'salwarSuitDropdown' ? 'show' : ''}`}
            >
              <a className="dropdown-item" href="#">Anarkali Suit</a>
              <a className="dropdown-item" href="#">Palazzo Suit</a>
              <a className="dropdown-item" href="#">Straight Suit</a>
            </div>
          </li>
          <li className="nav-item dropdown mx-5">
            <a
              className="nav-link"
              href="#"
              id="newArrivalsDropdown"
              onClick={(e) => handleDropdownClick(e, 'newArrivalsDropdown')}
            >
              New Arrivals
            </a>
            <div
              className={`dropdown-menu custom-dropdown-menu ${activeDropdown === 'newArrivalsDropdown' ? 'show' : ''}`}
            >
              <a className="dropdown-item" href="#">Latest Saree Collection</a>
              <a className="dropdown-item" href="#">Trending Suits</a>
              <a className="dropdown-item" href="#">New Dress Materials</a>
            </div>
          </li>
          <li className="nav-item dropdown mx-5">
            <a
              className="nav-link"
              href="#"
              id="occasionDropdown"
              onClick={(e) => handleDropdownClick(e, 'occasionDropdown')}
            >
              Occasion
            </a>
            <div
              className={`dropdown-menu custom-dropdown-menu  ${activeDropdown === 'occasionDropdown' ? 'show' : ''}`}
            >
              <a className="dropdown-item" href="#">Wedding Collection</a>
              <a className="dropdown-item" href="#">Festive Collection</a>
              <a className="dropdown-item" href="#">Casual Wear</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
};

export default NavbarComponent;
