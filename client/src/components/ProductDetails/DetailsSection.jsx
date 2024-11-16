import React, { useEffect, useState } from 'react';
import './productDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCartStart, deleteCartStart, getCartStart } from '../../redux/action/cart.action';
import { addToWishlistStart, getWishListStart, removeFromWishlistStart } from '../../redux/action/wishlist.action';
import { Spinner } from 'react-bootstrap'; // Import Spinner from react-bootstrap

const DetailsSection = ({ CurrentProductDetails }) => {
  const currentUser = useSelector(state => state.user.currentUser);
  const currentCart = useSelector(state => state.cart.currentCart);
  const [isInWishlist, setIsInWishlist] = useState(false); // Track if product is in wishlist
  const [isAddedToCart, setIsAddedToCart] = useState(false); // Track if product is added to cart
  const [loading, setLoading] = useState(false); // Track loading state for the button
  const [wishlistLoading, setWishlistLoading] = useState(false); // Track loading state for wishlist
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToWishlist = (productId) => {
    if(!currentUser.name){
       return alert('Please Login To Add To Wishlist')
      }
      if (currentUser) {
      const userId = currentUser.id;
      const data = { userId, productId };

      

      setWishlistLoading(true); // Start loading for wishlist button

      if (isInWishlist) {
        dispatch(removeFromWishlistStart(data));
        setIsInWishlist(false);
        localStorage.removeItem(`wishlist-${productId}`);
      } else {
        dispatch(addToWishlistStart(data));
        setIsInWishlist(true);
        localStorage.setItem(`wishlist-${productId}`, true);
      }
      dispatch(getWishListStart(currentUser?.id))
      setWishlistLoading(false); // Stop loading after the action completes
    } else {
      alert("You need to be logged in to add items to your wishlist.");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteCartStart(id));
    dispatch(getCartStart());
  };

  const handleCartToggle = (product) => {
    window.scrollTo(0, 0); 
    if (!currentUser) {
     alert('Please Login To Add To Cart')
      navigate('/login');
      return
    } else if (isAddedToCart) {
      handleDelete(product._id);
      setIsAddedToCart(false);
      localStorage.removeItem(`cart-${product._id}`);
    } else {
      setLoading(true); // Start loading
      dispatch(addCartStart(product)); // Dispatch action to add to cart
      setTimeout(() => {
        setIsAddedToCart(true);
        localStorage.setItem(`cart-${product._id}`, true);
        setLoading(false); // Stop loading after 3 seconds
      }, 3000); // Simulate delay of 3 seconds
    }
  };

  useEffect(() => {
    const inCart = localStorage.getItem(`cart-${CurrentProductDetails._id}`);
    setIsAddedToCart(!!inCart);
    const inWishlist = localStorage.getItem(`wishlist-${CurrentProductDetails._id}`);
    setIsInWishlist(!!inWishlist);
  }, [CurrentProductDetails, currentCart.items?.length]);

  useEffect(() => {
    if (currentUser) {
      dispatch(getWishListStart(currentUser.id));
    }
  }, [isInWishlist, currentUser, dispatch]);

  return (
    <div className="col-lg-12 p-0 m-0">
      <div className="product-details">
        <h1 className="product-title fw-normal fs-4 heading">{CurrentProductDetails?.name}</h1>
        <p className="price">INR {CurrentProductDetails?.price}<span className="mx-1 text-decoration-line-through small">
                      ₹{(Number(CurrentProductDetails?.price) * 1.5).toFixed(2)}
                    </span><br />(incl. of all taxes)</p>
        {/* <div className="product-price text-left">
                    <span className="text-dark">₹{Number(CurrentProductDetails?.price).toFixed(2)}</span>
                    
                  </div> */}

        <button 
          disabled={loading || isAddedToCart} // Disable the button while loading
          onClick={() => handleCartToggle(CurrentProductDetails)} 
          className={`btn btn-outline-dark col-12 mt-3 ${isAddedToCart ? 'bg-dark text-white' : 'bg-white text-dark'}`}
        >
          {loading ? <Spinner animation="border" size="sm" /> : (isAddedToCart ? "Added to Cart" : "Add to Cart")}
        </button>

        <button onClick={() => handleAddToWishlist(CurrentProductDetails._id)} className="btn btn-outline-dark col-12 mt-2">
          {wishlistLoading ? (
            <Spinner animation="border" size="sm" className="text-danger" />
          ) : (
            <i className={`fa${isInWishlist ? 's' : 'r'} mx-1 fa-heart text-${isInWishlist ? 'danger' : 'dark'}`}></i>
          )}
          {!isInWishlist ? 'Add to Wishlist' : 'Remove from Wishlist'}
        </button>

        <div>
          <h5 className='fw-normal mt-5 mb-2'>Returns & Exchange Information</h5>
          <p className='m-0 p-0 small text-muted'>1. Hassle-free returns within 7 days; </p>
          <p className='m-0 p-0 small text-muted'> 2. specific conditions apply based on products and promotions.</p>
          <p className='m-0 p-0 small text-muted'>3. Prepaid order refunds are processed to the original payment method; COD orders receive a coupon code refund.</p>
          <p className='m-0 p-0 small text-muted'>4. Issues with defective, incorrect, or damaged products must be reported within 24 hours of delivery.</p>
          <p className='m-0 p-0 small text-muted'>5. Items purchased during special sales with free product offers, like BOGO, are ineligible for returns.</p>
          <p className='m-0 p-0 small text-muted'>6. A reverse shipment fee of Rs 100 is charged, which will be deducted from the refund.</p>
          <p className='m-0 p-0 small text-muted'>7. For hygiene, items such as accessories, sunglasses, perfumes, masks, and innerwear are non-returnable.</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
