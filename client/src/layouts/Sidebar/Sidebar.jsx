import React, { useEffect, useState } from 'react';
import './sidebar.css'; // Ensure this path is correct
import CartSidebar from '../../pages/frontend/Cart';
import { useDispatch, useSelector } from 'react-redux';

function Sidebar({ sidebarOpen, toggleSidebar }) {
const isCartOpen = useSelector(state => state.cart.isCartOpen);
  const currentUser = useSelector(state=>state.user.currentUser)
  const dispatch = useDispatch()

  // Toggle cart sidebar
  const toggleCartSidebar = () => {
   if(!currentUser?.name){
      alert('Please login to use bag')
      return 0
   }
    if(sidebarOpen){
      toggleSidebar(); // Close the main sidebar when the cart sidebar is opened or closed
    }
    dispatch({ type: 'TOGGLE_CART' });
  };
  useEffect(() => {
  if (!currentUser?.name && isCartOpen) {
    dispatch({ type: 'TOGGLE_CART' });
  }
}, [currentUser, isCartOpen, dispatch]);
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
      <CartSidebar cartSidebarOpen={isCartOpen} toggleCartSidebar={toggleCartSidebar} />
    </>
  );
}

export default Sidebar;
