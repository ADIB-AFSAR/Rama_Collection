import React, { useState } from 'react';
import './sidebar.css'; // Ensure this path is correct
import CartSidebar from '../../pages/frontend/Cart';
import { useSelector } from 'react-redux';

function Sidebar({ sidebarOpen, toggleSidebar }) {
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false); // For cart sidebar
  const currentUser = useSelector(state=>state.user.currentUser)

  // Toggle cart sidebar
  const toggleCartSidebar = () => {
   if(!currentUser && !currentUser?.name){
      alert('Please login to user bag')
      return 0
   }
    setCartSidebarOpen(!cartSidebarOpen); 
    if(sidebarOpen){
      toggleSidebar(); // Close the main sidebar when the cart sidebar is opened or closed
    }
  };
  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <button className="close-btn" onClick={toggleSidebar}>
            &times;
          </button>
          <ul className="nav flex-column mt-5">
            <li className="nav-item fs-5 fw-normal">
              <a className="nav-link text-dark cursor-pointer" href="/dashboard">
                <i className="fas fa-user text-success"></i> Dashboard
              </a>
            </li> 
              <hr></hr>
            <li className="nav-item fs-5 fw-normal">
              <a className="nav-link text-dark cursor-pointer" href="/wishlist">
                <i className="fas fa-heart text-danger"></i> Wishlist
              </a>
            </li>
            <hr></hr>
            <li className="nav-item fs-5 fw-normal cursor-pointer"  onClick={()=>toggleCartSidebar()}>
              <a className="nav-link text-dark btn text-left">
                <i className="fas fa-shopping-cart text-warning"></i> Cart
              </a>
            </li> 
          </ul>
        </div>
      </div>
      {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
      <CartSidebar cartSidebarOpen={cartSidebarOpen} toggleCartSidebar={toggleCartSidebar} />
    </>
  );
}

export default Sidebar;
