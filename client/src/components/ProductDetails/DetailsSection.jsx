import React, { useEffect, useState } from 'react';
import './productDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCartStart, deleteCartStart, getCartStart } from '../../redux/action/cart.action';
import { addToWishlistStart, getWishListStart, removeFromWishlistStart } from '../../redux/action/wishlist.action';
import { Button, Modal, Spinner } from 'react-bootstrap'; // Import Spinner from react-bootstrap
import { toast } from 'react-toastify'; 
import { addReviewRequest, fetchReviewsRequest } from '../../redux/action/review.action';
import { formatDate, getTimeAgo } from '../../hooks/TimesCalc';
import { getToken } from '../../redux/service/token.service';
import axios from 'axios';

 

const DetailsSection = ({ CurrentProductDetails }) => {
  const currentUser = useSelector(state => state.user.currentUser);
  const currentCart = useSelector(state => state.cart.currentCart);
   const [isInWishlist, setIsInWishlist] = useState(false); // Track if product is in wishlist
  const [isAddedToCart, setIsAddedToCart] = useState(false); // Track if product is added to cart
   const [wishlistLoading, setWishlistLoading] = useState(false); // Track loading state for wishlist
  const [selectedSize, setSelectedSize] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0); 
  const [hasFetchedReviews, setHasFetchedReviews] = useState(false);

const productId = CurrentProductDetails?._id;
const reviews = useSelector(state => state.reviews.reviewsByProduct?.[productId] || []);
const loading = useSelector(state => state.reviews.loading)
const [productReviews, setProductReviews] = useState([]);

const handleReviewDelete = (id) => {
  setProductReviews(productReviews.filter((rev) => rev._id !== id));
};

useEffect(() => {
  if (reviews && CurrentProductDetails?._id) {
    const filtered = reviews.filter(
      (r) => r.productId === CurrentProductDetails._id
    );
    setProductReviews(filtered);
  }
}, [reviews, CurrentProductDetails]);

const latestReviews = [...productReviews]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest first
  .slice(0, 3);const [showAllReviewsModal, setShowAllReviewsModal] = useState(false);
const handleClose = () => setShowAllReviewsModal(false);
const handleShow = () => setShowAllReviewsModal(true);



  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  console.log(reviews,"REVIEWS")

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
    dispatch(addCartStart(productToAdd)); 
     setTimeout(() => {
      setIsAddedToCart(true);
      localStorage.setItem(`cart-${product._id}`, true);
      toast.success('Item added to cart');      
    }, 3000);
  }
};

 useEffect(() => {
  if (CurrentProductDetails?._id && !hasFetchedReviews) {
    dispatch(fetchReviewsRequest({ productId: CurrentProductDetails._id }));
    setHasFetchedReviews(true);
  }
}, [CurrentProductDetails?._id, hasFetchedReviews]);


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

  const handleDeleteReview = async (id) => {
  if (window.confirm("Are you sure you want to delete this review?")) {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/reviews/${id}`, {
        headers: { Authorization: getToken() },
      });
  setProductReviews(productReviews.filter((rev) => rev._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete review");
    }
  }
};


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
         {/* Reviews */}
{/* Reviews */}
<div className="mt-5">
  <h4 className="mb-4">Customer Reviews</h4>

  {/* Show latest 3 reviews or "No reviews yet" */}
  {loading ? (
  <div className="d-flex justify-content-center my-3">
    <Spinner animation="border" size="sm" className="text-primary" />
  </div>
) : latestReviews?.length === 0 ? (
  <p className="text-muted">No reviews yet.</p>
) : (
  latestReviews?.map((rev, idx) => (
    <div className="border py-1 px-3 mb-3 bg-light rounded shadow-sm">
  <div className="d-flex align-items-center mb-2">
    <div className="bg-success review-rating text-white px-2 py-1 mt-1 rounded small fw-bold me-2">
      {rev.rating}★
    </div>
    <div className=''><p className="mb-0 text-muted small review-time">{rev.user?.name} &nbsp;|&nbsp; {getTimeAgo(rev.createdAt)}</p>
    </div>
  </div>
  <p className="text-dark d-flex justify-content-between review-cmnt small mb-0">{rev.comment}{currentUser?.role === 'admin' && (
  <span
    className="ms-2 m-0 p-0"
    onClick={() => handleDeleteReview(rev._id)}
  >
    <i className='bi bi-trash text-danger review-trashs m-0 p-0'></i>
  </span>
)}</p>
</div>
  ))
)}


  {/* View all reviews button */}
  {productReviews.length > 3 && (
    <button
      type="button"
      className="btn btn-outline-primary mt-2"
      onClick={handleShow}
    >
      View All Reviews
    </button>
  )}

  <hr className="my-4" />

  {/* Review form */}
  {currentUser?.name ? (
    <form onSubmit={handleReviewSubmit} className="p-4 border rounded bg-white shadow-sm">
      <h5 className="mb-3">Write a Review</h5>

      {/* Star Rating */}
      <div className="mb-3">
        <label className="form-label">Rating</label>
        <div className="d-flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                cursor: 'pointer',
                fontSize: '1.5rem',
                color: star <= rating ? '#ffc107' : '#e4e5e9',
              }}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Comment Input */}
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

      <button type="submit" className="btn btn-primary w-100">{loading ? <Spinner animation="border" size='sm' className="text-white spinner mt-2" />:"Submit Review"}</button>
    </form>
  ) : (
    <div className="alert alert-info mt-3">
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
    <Modal show={showAllReviewsModal} onHide={handleClose} centered size="lg">
  <Modal.Header closeButton>
    <Modal.Title>All Reviews</Modal.Title>
  </Modal.Header>
  <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
    {productReviews.length === 0 ? (
      <p>No reviews available.</p>
    ) : (
      productReviews.slice().map((review, idx) => (
        <div key={idx} className="mb-3 border-bottom pb-2">
          <strong>{review.user?.name}</strong> - {review.rating} {'⭐'.repeat(review?.rating)}{' '}<br />
          <small className="text-muted review-time">{getTimeAgo(review.createdAt)}</small>
          <p className='review-cmnt d-flex justify-content-between'>{review.comment}{currentUser?.role === 'admin' && (
  <span
    className="ms-2 m-0 p-0"
    onClick={() => handleDeleteReview(review._id)}
  >
    <i className='bi bi-trash text-danger review-trashs m-0 p-0'></i>
  </span>
)}
</p>
        </div>
      ))
    )}
  </Modal.Body>
  <Modal.Footer>
    {/* <Button variant="secondary" onClick={handleClose}>
      Close
    </Button> */}
  </Modal.Footer>
</Modal></div>
  );
};

export default DetailsSection;
