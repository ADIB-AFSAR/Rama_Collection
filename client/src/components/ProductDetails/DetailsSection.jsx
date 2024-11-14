import React, { useEffect, useState } from 'react';
import './productDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCartStart, deleteCartStart } from '../../redux/action/cart.action'; // Assuming `removeCartStart` action exists
import { addToWishlistStart, removeFromWishlistStart } from '../../redux/action/wishlist.action';
 
const DetailsSection = ({ CurrentProductDetails }) => {
  const currentUser = useSelector(state => state.user.currentUser);
  const [isInWishlist, setIsInWishlist] = useState(false); // Track if product is in wishlist
  const [isAddedToCart, setIsAddedToCart] = useState(false); // Track if product is added to cart
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToWishlist = (productId) => {
    if (currentUser) {
      const userId = currentUser.id;
      const data = { userId, productId };

      if (isInWishlist) {
        dispatch(removeFromWishlistStart(data));
        setIsInWishlist(false);
        localStorage.removeItem(`wishlist-${productId}`);
      } else {
        dispatch(addToWishlistStart(data));
        setIsInWishlist(true);
        localStorage.setItem(`wishlist-${productId}`, true);
      }
    } else {
      alert("You need to be logged in to add items to your wishlist.");
    }
  };

  const handleCartToggle = (product) => {
    if (!currentUser) {
      navigate('/login');
    } else if (isAddedToCart) {
      dispatch(deleteCartStart(product._id)); // Dispatch action to remove from cart
      setIsAddedToCart(false);
    } else {
      dispatch(addCartStart(product)); // Dispatch action to add to cart
      setIsAddedToCart(true);
    }
  };

  useEffect(() => {
    const inWishlist = localStorage.getItem(`wishlist-${CurrentProductDetails._id}`);
    setIsInWishlist(!!inWishlist);
  }, [CurrentProductDetails]);

  return (
    <div className="col-lg-12 p-0 m-0">
      <div className="product-details">
        <h1 className="product-title fw-normal fs-4 heading">{CurrentProductDetails?.name}</h1>
        <p className="price">INR {CurrentProductDetails?.price}<br />(incl. of all taxes)</p>

        <button 
          onClick={() => handleCartToggle(CurrentProductDetails)} 
          className={`btn btn-outline-dark col-12 mt-3 ${isAddedToCart ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
          {isAddedToCart ? "Added to Cart" : "Add to Cart"}
        </button>

        <button onClick={() => handleAddToWishlist(CurrentProductDetails._id)} className="btn btn-outline-dark col-12 mt-2">
          <i className={`fa${isInWishlist ? 's' : 'r'} fa-heart text-${isInWishlist ? 'danger' : 'dark'}`}></i> Add to Wishlist
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
