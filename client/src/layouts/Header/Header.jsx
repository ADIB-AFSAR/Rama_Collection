import React, { useEffect, useState } from 'react';
import './header.css'; // Ensure this is the correct path to your CSS file
import Sidebar from '../Sidebar/Sidebar'; // Adjust the path as necessary
 import CartSidebar from '../../pages/frontend/Cart.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getWishListStart } from '../../redux/action/wishlist.action.js';
import { useNavigate } from 'react-router-dom';
 
function Header() {
  const products = useSelector((state) => state.product.products);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false); // For cart sidebar
  const [searchText, setSearchText] = useState(''); // Track search text
  const [searchVisible, setSearchVisible] = useState(false); // Show/Hide search results
   const currentCart = useSelector(state=>state.cart.currentCart)
  const currentUser = useSelector(state=>state.user.currentUser)
  const wishlist = useSelector(state => state.wishlist.items);
  const isUpdated = useSelector(state => state.wishlist.isUpdated);
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      setSearchText(''); // Clear the search input when hiding
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setSearchVisible(e.target.value.length > 0); // Show the product list only if search text is entered
  };

  // Filter products based on the search text (case-insensitive)
  const filteredProducts = products?.filter((product) =>
    product.name?.toLowerCase().includes(searchText?.toLowerCase())
  );

  const toProductDetailsPage = (id) => {
    setSearchText('')
    navigate(`/details/${id}`);
  };
   
    useEffect(() => {
      if (isUpdated && currentUser) {
        dispatch(getWishListStart(currentUser.id));
      }
    }, [isUpdated, currentUser, dispatch]);
    
 
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex align-items-center justify-content-start">
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
              <span className='updock-regular title fw-bold fs-1'>Rama Collections</span>
            </span>
          </a>

          <div className="d-flex ms-auto align-items-center">
            {!searchVisible && (<>
              {currentUser?.name && <div className="d-none d-lg-flex align-items-center me-2">
                <ul className="navbar-nav me-3">
                  <li className="nav-item">
                  <a className="nav-link" href="/wishlist">
      <i className="fas fa-heart text-danger fs-4">
        <span className='cart-number'>
          { isUpdated 
            ? <i className="bi bi-hourglass-split"></i> 
            : wishlist?.length    // Show 0 if wishlist is empty
          }
        </span>
      </i>
    </a>
                  </li>
                  <li className="nav-item ">
                    <a className="nav-link btn">
                      <i className="fas fa-shopping-cart fs-4"  onClick={()=>toggleCartSidebar()}>
                        <span className='cart-number'>{currentCart?.items?.length ?? <i className="bi bi-hourglass-split"></i>}</span>
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
              <form className="d-flex w-100" onChange={handleSearchChange}>
                <input
                  className="form-control me-2 flex-grow-1"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  autoFocus
                  style={{ minWidth: '250px', maxWidth: '100%', width: '100%' }} // Adjusted widths
                />
                {/* <button className="btn btn-outline-primary" type="submit">
                  <i className="bi bi-search"></i>
                </button> */}
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
{searchText && filteredProducts?.length > 0 && (
  <div className="product-list position-absolute bg-white shadow-lg p-3">
    <p className='text-center my-2 text-capitalize '>Search results</p>
    <div className="row"> {/* Ensure there's a row here */}
      {filteredProducts.slice(0,6).map((product) => (
        <div key={product.id} className="col-6 col-sm-4 col-md-4 mb-3"> {/* Use col-6 for two items on small screens */}
          <div className="product d-flex align-items-center">
            <img style={{cursor:"pointer"}}
            onClick={()=>toProductDetailsPage(product._id)}
               src={product.images[0]}
              alt={product.title}
              height={'80px'}
               onMouseOver={(e) => e.currentTarget.src = product.images[1] || product.images[0]}
              onMouseOut={(e) => e.currentTarget.src = product.images[0]}
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
{/* Show a message when no products match the search */}
{searchText && filteredProducts?.length === 0 && (
  <div className="product-list position-absolute bg-white shadow-lg p-3">
        <div className="text-center">No products found</div>
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
