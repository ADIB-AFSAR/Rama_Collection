import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NaviagtionBar.css';
import SlidingInfo from '../SlidingInfo/SlidingInfo';
import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  // Dropdown configuration
  const dropdowns = [
    {
      id: 'sareeDropdown',
      label: 'Saree',
      items: [
        { label: 'Silk Saree', category: 'saree' },
        { label: 'Cotton Saree', category: 'saree' },
        { label: 'Designer Saree', category: 'saree' },
      ],
    },
    {
      id: 'dressMaterialDropdown',
      label: 'Dress Material',
      items: [
        { label: 'Cotton Dress Material', category: 'material' },
        { label: 'Silk Dress Material', category: 'material' },
        { label: 'Printed Dress Material', category: 'material' },
      ],
    },
    {
      id: 'salwarSuitDropdown',
      label: 'Salwar Suit',
      items: [
        { label: 'Anarkali Suit', category: 'salwar suit' },
        { label: 'Palazzo Suit', category: 'salwar suit' },
        { label: 'Straight Suit', category: 'salwar suit' },
      ],
    },
    {
      id: 'occasionDropdown',
      label: 'Occasion',
      items: [
        { label: 'Wedding Collection', category: 'occasion' },
        { label: 'Festive Collection', category: 'occasion' },
        { label: 'Casual Wear', category: 'occasion' },
      ],
    },
  ];

  const handleDropdownClick = (e, dropdownId) => {
    e.preventDefault();
    setActiveDropdown(prev => (prev === dropdownId ? null : dropdownId));
  };

  const toProductListingPage = (category) => {
    navigate(`/new/${category}/collections`);
  };

  return (
    <>
      <SlidingInfo />
      <nav className="navbar navbar-expand-lg navbar-light bg-light custom-navbar w-100">
        <div className="navbar-nav mx-auto d-flex justify-content-center flex-row">
          {dropdowns.map(dropdown => (
            <li key={dropdown.id} className="nav-item dropdown mx-5">
              <a
                className="nav-link text-uppercase"
                href="#"
                onClick={(e) => handleDropdownClick(e, dropdown.id)}
              >
                {dropdown.label}
              </a>
              <div
                className={`dropdown-menu custom-dropdown-menu ${
                  activeDropdown === dropdown.id ? 'show' : ''
                }`}
              >
                {dropdown.items.map((item, idx) => (
                  <a
                    key={idx}
                    className="dropdown-item"
                    onClick={() => toProductListingPage(item.category)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </li>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavbarComponent;
