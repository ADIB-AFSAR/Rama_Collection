import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWishListStart, removeFromWishlistStart } from '../../redux/action/wishlist.action';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"
import SkeletonLoader from '../../components/SkeletonLoader/skeletonLoader';
import { Spinner } from 'react-bootstrap';

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.items);
  const loading = useSelector((state) => state.wishlist.loading);
  const isdeleted = useSelector((state) => state.wishlist.isdeleted);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const isWishlistLoading = loading || wishlist === null || typeof wishlist === 'undefined';

  const handleRemove = (productId) => {    
    setDeletingProductId(productId); 
    const userId = currentUser.id;
    dispatch(removeFromWishlistStart({ userId, productId }));
    localStorage.removeItem(`wishlist-${productId}`);
     setTimeout(() => {
      dispatch(getWishListStart(userId));
    }, 1000);
  };

  const toProductDetailsPage = (id) => {
    navigate(`/details/${id}`);
  };

  useEffect(() => {
    if (!currentUser?.name) {
      navigate('/login');
    }
    if (currentUser?.id) {
      dispatch(getWishListStart(currentUser?.id));
    }
  }, [currentUser, wishlist?.length]);

  useEffect(() => {
  if (isdeleted && deletingProductId) {
    setDeletingProductId(null); // Clear spinner only after confirmed deletion
  }
}, [isdeleted, deletingProductId]);


//   useEffect(() => {
//     if (!loading) {
//       setTimeout(() => setLocalLoading(false), 500);
//     }
//   }, [loading, wishlist , dispatch]);

  

  return (
    <div>
      {/* Internal CSS */}
      <style>{`
        .image-container {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .img.primary {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
          z-index: 1;
          position: relative;
        }

        .img.secondary {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: auto;
          object-fit: cover;
          opacity: 0;
          z-index: 2;
          transition: opacity 0.3s ease-in-out;
        }

        .image-container:hover .secondary {
          opacity: 1;
        }

        .heart-button {
          position: absolute;
          bottom: 10px;
          left: 10px;
          z-index: 3;
          background-color: transparent;
          border: none;
          cursor: pointer;
          font-size: 1.5rem;
          color: red;
        }

        .product-title {
          font-size: 1rem;
          font-weight: 500;
          margin-top: 0.5rem;
          margin-bottom: 0.2rem;
        }

        .product-price {
          font-size: 0.9rem;
        }

        .loader-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @media (max-width: 768px) {
          .col-md-6 {
            flex: 0 0 50%;
            max-width: 50%;
            padding: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .col-md-6 {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }
      `}</style>

      <a onClick={() => window.history.back()}>
        <i
          style={{ cursor: 'pointer', left: '5%' }}
          className="bi bi-arrow-left fs-3 text-dark position-absolute"
        ></i>
      </a>

      {isWishlistLoading ? (
        <SkeletonLoader/>
      ) : (
        <div>
          <h4 className="text-center text-capitalize my-3">Your Wishlist</h4>
          {wishlist?.length > 0 ? (
            <div className="row justify-content-center mx-0">
              {wishlist.map((product) => (
                <div
                  key={product?.productId?._id}
                  className="col-md-2 product-card h-100 d-flex flex-column align-items-start"
                >
                  <div className="image-container w-100">
                    <img
                      onClick={() => toProductDetailsPage(product?.productId?._id)}
                      className="img primary"
                      src={product?.productId?.images[0]}
                      alt={product?.productId?.name}
                    />
                    <img
                      onClick={() => toProductDetailsPage(product?.productId?._id)}
                      className="img secondary"
                      src={product?.productId?.images[1]}
                      alt={`${product?.productId?.name} Back`}
                    />
                    {deletingProductId === product?.productId?._id ? (
  <div className="heart-button">
    <Spinner animation="border" size="sm" variant="danger" />
  </div>
) : (
  <button
    onClick={() => handleRemove(product?.productId?._id)}
    className="heart-button text-danger fs-4 mb-1"
  >
    <i className="fa fa-heart heart-bg"></i>
  </button>
)}
                  </div>
                  <div className="product-title card-title mt-2 text-left text-capitalize">
                    {product.productId?.name}
                  </div>
                  <div className="product-price text-left mx-2 mb-3">
                    <span className="text-decoration-line-through small">
                      ₹{(Number(product.productId?.price) * 1.5).toFixed(2)}
                    </span>
                    <span className="mx-1 text-dark">
                      ₹{Number(product.productId?.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) :(isWishlistLoading && wishlist?.length === 0) ? (
  <div className="text-center my-5">
    <p>Your wishlist is empty!</p>
  </div>
) : null}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
