import React, { useEffect, useState } from 'react';
import './header.css'; // Ensure this is the correct path to your CSS file
import Sidebar from '../Sidebar/Sidebar'; // Adjust the path as necessary
import {products} from '../../dummydata.js';
import CartSidebar from '../../pages/frontend/Cart.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getWishListStart } from '../../redux/action/wishlist.action.js';
import { getCartStart } from '../../redux/action/cart.action.js';

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false); // For cart sidebar
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const currentCart = useSelector(state=>state.cart.currentCart)
  const currentUser = useSelector(state=>state.user.currentUser)
  const wishlist = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch()

  console.log("wishlist length:",wishlist.length)
   const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Toggle cart sidebar
  const toggleCartSidebar = () => {
    setCartSidebarOpen(!cartSidebarOpen); 
  };


  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (searchVisible) {
      setSearchQuery(''); // Clear the search input when hiding
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    if (searchQuery.trim()) { // Ensure there is input (ignores spaces)
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered); // Update the filtered products
    } else {
      setFilteredProducts([]); // Clear the product list if no input
    }
  };
  useEffect(()=>{
    dispatch(getCartStart())
    if(currentUser){
      dispatch(getWishListStart(currentUser?.id))
    } 
  },[])

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex align-items-center">
          <button
            className="navbar-toggler d-lg-none me-2 mx-2"
            type="button"
            onClick={()=>toggleSidebar()}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <a className="navbar-brand d-flex align-items-center" href="/">
            {/* <img
              src="/images/logo.png"
              width="60"
              height="50"
              className="d-inline-block align-top m-0 p-0"
              alt="Logo"
            /> */}
            <span className="ml-2 h4">
              <span className='updock-regular fw-bold fs-1'>Rama Collections</span>
            </span>
          </a>

          <div className="d-flex ms-auto align-items-center">
            {!searchVisible && (<>
              {currentUser?.name && <div className="d-none d-lg-flex align-items-center me-2">
                <ul className="navbar-nav me-3">
                  <li className="nav-item">
                    <a className="nav-link" href="/wishlist ">
                      <i className="fas fa-heart text-danger fs-4">
                      <span className='cart-number'>{wishlist?.length ?? <i class="bi bi-arrow-clockwise"></i>}</span>
                      </i>
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a className="nav-link btn">
                      <i className="fas fa-shopping-cart fs-4"  onClick={()=>toggleCartSidebar()}>
                        <span className='cart-number'>{currentCart?.items?.length ?? 0}</span>
                      </i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/dashboard">
                      <i className="fas fa-user fs-4"></i>
                    </a>
                  </li>
                </ul>
              </div>}
            </>)}

            {!searchVisible && (
              <button
                className="btn btn-outline-secondary me-2"
                onClick={toggleSearch}
              >
                <i className="bi bi-search"></i>
              </button>
            )}

            {searchVisible && (
              <form className="d-flex w-100" onSubmit={handleSearchSubmit}>
                <input
                  className="form-control me-2 flex-grow-1"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{ minWidth: '250px', maxWidth: '100%', width: '100%' }} // Adjusted widths
                />
                <button className="btn btn-outline-primary" type="submit">
                  <i className="bi bi-search"></i>
                </button>
                <button
                  className="btn btn-outline-danger ms-2"
                  type="button"
                  onClick={toggleSearch}
                >
                  <i className="bi bi-x"></i>
                </button>
              </form>
            )}
            
{/* Product List (Absolute Positioned) */}
{searchVisible && (
  <div className="product-list position-absolute bg-white shadow-lg p-3" style={{ zIndex: 1000 }}>
    <h4 className='text-center my-2'>Explore Collections</h4>
    <div className="row"> {/* Ensure there's a row here */}
      {filteredProducts.map((product) => (
        <div key={product.id} className="col-6 col-sm-4 col-md-4 mb-3"> {/* Use col-6 for two items on small screens */}
          <div className="product d-flex align-items-center">
            <img
              src={product.imgSrc}
              alt={product.title}
              height={'60px'}
              width={'50px'}
              onMouseOver={(e) => e.currentTarget.src = product.imgHoverSrc}
              onMouseOut={(e) => e.currentTarget.src = product.imgSrc}
              className="me-3"
            />
            {/* <div>
              <h5 className="m-0">{product.title}</h5> 
            </div> */}
          </div>
        </div>
      ))}
    </div>
  </div>
)}
</div>
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Cart Sidebar */}
      <CartSidebar cartSidebarOpen={cartSidebarOpen} toggleCartSidebar={toggleCartSidebar} />
    </header>
  );
}

export default Header;
