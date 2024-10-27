import React, { useEffect, useState } from 'react';
import './productDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCartStart } from '../../redux/action/cart.action';
import { addToWishlistStart, removeFromWishlistStart } from '../../redux/action/wishlist.action';
import CartSidebar from '../../pages/frontend/Cart';

const DetailsSection = ({ CurrentProductDetails }) => {
  const currentUser  = useSelector(state => state.user.currentUser );
  const sizes = ['s', 'm', 'x', 'xl']; // Available sizes
  const [selectedSize, setSelectedSize] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false); // State to track if product is in wishlist
  const [isAddedToBag, setIsAddedToBag] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

   

  const handleSizeClick = (size) => {
      setSelectedSize(size);
      setIsAddedToBag(false);
  };

  const handleAddToWishlist = (productId) => {
      if (currentUser ) {
          const userId = currentUser.id;
          const data = { userId, productId };

          if (isInWishlist) {
              // Remove from wishlist
              dispatch(removeFromWishlistStart(data)); // Dispatch action to remove from wishlist
              setIsInWishlist(false); // Update state
              localStorage.removeItem(`wishlist-${productId}`); // Remove from localStorage
          } else {
              // Add to wishlist
              dispatch(addToWishlistStart(data)); // Dispatch action to add to wishlist
              setIsInWishlist(true); // Update state
              localStorage.setItem(`wishlist-${productId}`, true); // Save to localStorage
          }
      } else{
          alert("You need to be logged in to add items to your wishlist.");
      }
  };

  const addToCart = (product) => {
      if (!currentUser .name) {
          navigate('/login');
      }
      if (!selectedSize) {
          alert("Please select a size to continue");
          return;
      }
      const productWithSize = { ...product, size: selectedSize };
      dispatch(addCartStart(productWithSize));
      setIsAddedToBag(true); // Set add-to-bag status to true
    //   window.location.reload()
   };

  useEffect(() => {
      // Check if the product is already in the wishlist
      const inWishlist = localStorage.getItem(`wishlist-${CurrentProductDetails._id}`);
      setIsInWishlist(!!inWishlist);
  }, [CurrentProductDetails]);

    return (
        <div className="col-lg-12 p-0 m-0">
            <div className="product-details">
                <h1 className="product-title fw-normal fs-4 heading">{CurrentProductDetails?.name}</h1>
                <p className="price">INR {CurrentProductDetails?.price}<br/>(incl. of all taxes)</p>
                <div className="size-options">
                    <span className='size fw-semibold mr-3'>SIZE -</span>
                    {sizes.map(size => (
                        <button key={size}
                            onClick={() => handleSizeClick(size)}
                            className={`btn btn-sm btn-outline-dark ${selectedSize === size ? 'bg-dark text-white' : ''}`}>
                            {size.toUpperCase()}
                        </button>
                    ))}
                </div>
                 <button 
          onClick={() => addToCart(CurrentProductDetails)} 
          className={`btn btn-outline-dark col-12 mt-3 ${selectedSize ? 'bg-dark text-white' : "bg-white text-dark"}`}>
          {!selectedSize ? "Select size" : isAddedToBag ? "Added to Bag" : "Add to Bag"}
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