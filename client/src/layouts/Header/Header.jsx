import React, { useEffect, useState } from 'react';
import './header.css'; // Ensure this is the correct path to your CSS file
import Sidebar from '../Sidebar/Sidebar'; // Adjust the path as necessary
import CartSidebar from '../../pages/frontend/Cart.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getWishListStart } from '../../redux/action/wishlist.action.js';
import { useNavigate } from 'react-router-dom';

function Header() {
  const products = useSelector((state) => state.product.products);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false); // For cart sidebar
  const [searchText, setSearchText] = useState(''); // Track search text
  const [searchVisible, setSearchVisible] = useState(false); // Show/Hide search results
  const currentCart = useSelector(state => state.cart.currentCart);
  const currentUser = useSelector(state => state.user.currentUser);
  const wishlist = useSelector(state => state.wishlist.items);
  const isUpdated = useSelector(state => state.wishlist.isUpdated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const filteredProducts = products?.filter((product) =>
    product.name?.toLowerCase().includes(searchText?.toLowerCase())
  );

  const toProductDetailsPage = (id) => {
    setSearchText('');
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
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <span className="ml-2 h4">
              <span className="updock-regular title fw-bold fs-1">Rama Collections</span>
            </span>
          </a>

          {/* Navigation Links - Always Visible */}
          <div className="d-flex align-items-center w-100 justify-content-end">
 
              {!searchVisible && <ul className="navbar-nav d-flex flex-row align-items-center me-3">
                {currentUser.name && <><li className="nav-item">
                  <a className="nav-link" href="/wishlist">
                    <i className="fas fa-heart text-danger fs-4">
                      <span className="cart-number">
                        {isUpdated ? <i className="bi bi-hourglass-split"></i> : wishlist?.length || ''}
                      </span>
                    </i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link btn">
                    <i className="fas fa-shopping-cart fs-4" onClick={() => toggleCartSidebar()}>
                      <span className="cart-number">{currentCart?.items?.length || ''}</span>
                    </i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/dashboard">
                    <i className="fas fa-user fs-4"></i>
                  </a>
                </li></>}
              </ul>}
 
            {/* Search Toggle */}
            {!searchVisible && currentUser?.name && (
  <button className="btn btn-outline-secondary me-2" onClick={toggleSearch}>
    <i className="bi bi-search"></i>
  </button>
)}

            {/* Search Form */}
            {searchVisible && currentUser?.name && (
              <form className="d-flex justify-content-end w-100">
                <input
                  className="form-control input me-2 flex-grow-1"
                  type="search"
                  placeholder="Search Products"
                  aria-label="Search"
                  value={searchText}
                  onChange={handleSearchChange}
                  autoFocus
                />
                <button className="btn btn-outline-danger mx-2" type="button" onClick={toggleSearch}>
                  <i className="bi bi-x"></i>
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>

      {/* Product List */}
      {searchText && filteredProducts?.length > 0 && (
        <div className="product-list position-absolute bg-white shadow-lg p-3">
          <p className="text-center my-2 text-capitalize">Search results</p>
          <div className="row">
            {filteredProducts.slice(0, 6).map((product) => (
              <div key={product.id} className="col-6 col-sm-4 col-md-4 mb-3">
                <div className="product d-flex align-items-center">
                  <img
                    style={{ cursor: 'pointer' }}
                    onClick={() => toProductDetailsPage(product._id)}
                    src={product.images[0]}
                    alt={product.title}
                    height={'80px'}
                    onMouseOver={(e) => (e.currentTarget.src = product.images[1] || product.images[0])}
                    onMouseOut={(e) => (e.currentTarget.src = product.images[0])}
                    className="me-3"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchText && filteredProducts?.length === 0 && (
        <div className="product-list position-absolute bg-white shadow-lg p-3">
          <div className="text-center">No products found</div>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar cartSidebarOpen={cartSidebarOpen} toggleCartSidebar={toggleCartSidebar} />
    </header>
  );
}

export default Header;
