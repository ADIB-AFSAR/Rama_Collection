import React, { useEffect, useState } from 'react';
import './productDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCartStart, deleteCartStart, getCartStart } from '../../redux/action/cart.action';
import { addToWishlistStart, getWishListStart, removeFromWishlistStart } from '../../redux/action/wishlist.action';
import { Spinner } from 'react-bootstrap'; // Import Spinner from react-bootstrap
import { toast } from 'react-toastify'; 
import { addReviewRequest, fetchReviewsRequest } from '../../redux/action/review.action';
import { createSelector } from 'reselect';

const selectReviewState = state => state.review;

  const getReviews = createSelector(
  [selectReviewState],
  (review) => review.reviews
);

const DetailsSection = ({ CurrentProductDetails }) => {
  const currentUser = useSelector(state => state.user.currentUser);
  const currentCart = useSelector(state => state.cart.currentCart);
  const reviews = useSelector(getReviews);
  const [isInWishlist, setIsInWishlist] = useState(false); // Track if product is in wishlist
  const [isAddedToCart, setIsAddedToCart] = useState(false); // Track if product is added to cart
  const [loading, setLoading] = useState(false); // Track loading state for the button
  const [wishlistLoading, setWishlistLoading] = useState(false); // Track loading state for wishlist
  const [selectedSize, setSelectedSize] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const selectReviewState = state => state.review;
 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleAddToWishlist = (productId) => {
    if(!currentUser.name){
       alert('Please Login To Add To Wishlist')
       navigate('/login');
       return
      }
      if (currentUser) {
      const userId = currentUser.id;
      const data = { userId, productId };

      

      setWishlistLoading(true); // Start loading for wishlist button

      if (isInWishlist) {
        dispatch(removeFromWishlistStart(data));
        setIsInWishlist(false);
        toast.success("Item removed from wishlist")
        localStorage.removeItem(`wishlist-${productId}`);
      } else {
        dispatch(addToWishlistStart(data));
        setIsInWishlist(true);
        toast.success('Item added to wishlist')
        localStorage.setItem(`wishlist-${productId}`, true);
      }
      dispatch(getWishListStart(currentUser?.id))
      setWishlistLoading(false); // Stop loading after the action completes
    } else {
      alert("You need to be logged in to add items to your wishlist.");
    }
    
    setTimeout(() => {
      if (isInWishlist) {
        // Remove from wishlist logic
      } else {
        // Add to wishlist logic
      }
      
      setWishlistLoading(false);
      
      // Trigger animation class
      const heartIcon = document.querySelector(`.heart-icon-${productId}`);
      heartIcon.classList.add('animate');
      setTimeout(() => {
        heartIcon.classList.remove('animate');
      }, 300); // Match the CSS animation duration
    }, 500); // Simulating network request
    
  };
  const handleReviewSubmit = (e) => {
  e.preventDefault();

  dispatch(addReviewRequest({
    productId : CurrentProductDetails?._id,
    user: {
      name: currentUser.name,
      email: currentUser.email,
    },
    comment,
    rating,
  }));
  setComment('');
  setRating(0);
};

  useEffect(() => {
  dispatch(fetchReviewsRequest(CurrentProductDetails?._id));
}, [dispatch,CurrentProductDetails?._id]);

  const handleDelete = (id) => {
    dispatch(deleteCartStart(id));
    dispatch(getCartStart());
  };

  const handleCartToggle = (product) => {
  if (!currentUser?.name) {
    alert('Please Login To Add To Cart');
    navigate('/login');
    return;
  }

  if (product.enableSize && !selectedSize) {
    toast.error('Please select a size before adding to cart');
    return;
  }

  const productToAdd = {
    ...product,
    selectedSize: selectedSize || '', // Add size if applicable
  };

  if (isAddedToCart) {
    handleDelete(product._id);
    setIsAddedToCart(false);
    setSelectedSize('');
    localStorage.removeItem(`cart-${product._id}`);
    toast.success('Item removed from cart');
  } else {
    setLoading(true);
    dispatch(addCartStart(productToAdd)); 
     setTimeout(() => {
      setIsAddedToCart(true);
      localStorage.setItem(`cart-${product._id}`, true);
      toast.success('Item added to cart');
      
      setLoading(false);
    }, 3000);
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
        <h1 className="product-title fw-normal fs-4 heading  mx-1 quicksand fw-semibold">{CurrentProductDetails?.name}</h1>
        <p className="price  mx-2 fw-semibold quicksand">INR {CurrentProductDetails?.price}<span className="mx-1 text-decoration-line-through small">
                      ₹{(Number(CurrentProductDetails?.price) * 1.5).toFixed(2)}
                    </span><br />(incl. of all taxes)</p>
        {/* <div className="product-price text-left">
                    <span className="text-dark">₹{Number(CurrentProductDetails?.price).toFixed(2)}</span>
                    
                  </div> */}
                  
                  {/* {CurrentProductDetails?.quantity < 10 && (<div className="stock-badge badge-in-phone mx-3">
    {CurrentProductDetails?.quantity} left
  </div>)} */}
  {CurrentProductDetails.quantity > 0 && CurrentProductDetails.quantity < 10 && (
  <div className="stock-badge bg-warning text-dark badge-in-phone mx-3">
    {CurrentProductDetails.quantity} left
  </div>
)}

{CurrentProductDetails.quantity <= 0 && (
  <div className="stock-badge bg-danger text-white badge-in-phone mx-3">
    Out of Stock
  </div>
)}
                 {CurrentProductDetails.sizes.map(size => (
  <button
    key={size}
    className={`btn btn-sm mx-1 ${selectedSize === size ? 'btn-dark text-white' : 'btn-outline-dark'}`}
    // disabled={isAddedToCart && selectedSize !== size} // Disable other sizes if added to cart
    onClick={() => {
      if (isAddedToCart && selectedSize !== size) {
        toast.info('Please delete the item from cart first.');
        return;
      }
      setSelectedSize(size);
    }}
  >
    {size}
  </button>
))}


                  {CurrentProductDetails?.quantity > 0 && <button
    disabled={loading} // Only disable the button while loading
    onClick={() => {
      if (isAddedToCart) {
        // Navigate to checkout if already added to cart
        navigate('/checkout');
      } else {
        // Add to cart action
        handleCartToggle(CurrentProductDetails);
      }
    }}
    className={`btn cart-button ${isAddedToCart ? 'clicked' : ''} btn-outline-dark col-12 mt-3 ${isAddedToCart ? 'bg-dark text-white' : 'bg-white text-dark'}`}
  >
    <span className="add-to-cart">
            Add To Cart
        </span>
        <span className="added">
              Proceed To Checkout
        </span>
    <i className="fas fa-shopping-cart"></i>
        <i className="fas fa-box"></i>
  </button>}

  <button onClick={() => handleAddToWishlist(CurrentProductDetails._id)} className="btn btn-outline-dark add-to-wishlist like-button d-flex justify-content-center col-12 mt-2">
  {wishlistLoading ? (
    <Spinner animation="border" size="sm" className="text-danger" />
  ) : (
    <div className='heart-bg'>
    <div
      className={` heart-icon-${CurrentProductDetails._id} ${isInWishlist ? "liked" : ""} heart-icon text-${
        isInWishlist ? 'danger' : 'dark'
      }`}
    ></div></div>
  )}
  <span className='add-to-wishlist'> {!isInWishlist ? 'Add to Wishlist' : 'Remove from Wishlist'}</span>
</button>
         {/* Reviews */}
         <div className="mt-5">
  <h4 className="mb-4">Customer Reviews</h4>

  {reviews?.length === 0 ? (
    <p className="text-muted">No reviews yet.</p>
  ) : (
    reviews?.map((rev, idx) => (
      <div key={idx} className="border rounded p-3 mb-3 shadow-sm bg-light">
        <div className="d-flex justify-content-between align-items-center">
          <strong className="text-capitalize">{rev.user.name}</strong>
          <span className="text-warning">
            {'⭐'.repeat(rev.rating)}{' '}
            <small className="text-muted">({rev.rating}/5)</small>
          </span>
        </div>
        <p className="mb-0 mt-2 text-secondary">{rev.comment}</p>
      </div>
    ))
  )}

  <hr className="my-4" />

  {currentUser.name ? (
    <form onSubmit={handleReviewSubmit} className="p-4 border rounded bg-white shadow-sm">
      <h5 className="mb-3">Write a Review</h5>

      <div className="mb-3">
        <label htmlFor="rating" className="form-label">Rating</label>
        <select
          id="rating"
          className="form-select"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        >
          <option value="">Select Rating</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} - {['Excellent', 'Good', 'Average', 'Poor', 'Terrible'][5 - r]}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="comment" className="form-label">Comment</label>
        <textarea
          id="comment"
          className="form-control"
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">Submit Review</button>
    </form>
  ) : (
    <div className="alert alert-info">
      Please <a href="/login" className="alert-link">login</a> to write a review.
    </div>
  )}
</div>


        <div className='return-info  mx-1 quicksand'>
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
