import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWishListStart, removeFromWishlistStart } from '../../redux/action/wishlist.action';
import { useNavigate } from 'react-router-dom';
import './frontend.css';

const Wishlist = () => {
    const wishlist = useSelector(state => state.wishlist.items);
    const loading = useSelector(state => state.wishlist.loading); // Assuming `loading` is managed in the Redux store
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [localLoading, setLocalLoading] = useState(true); // Optional local loading state
    
    console.log(wishlist);

    const handleRemove = (productId) => {
        const userId = currentUser.id;
        dispatch(removeFromWishlistStart({ userId, productId }));
        localStorage.removeItem(`wishlist-${productId}`);
        // window.location.reload()
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
    }, [currentUser, dispatch]);

    // Simulate local loading delay if necessary
    useEffect(() => {
        if (!loading) {
            setTimeout(() => setLocalLoading(false), 500); // Adjust the delay as needed
        }
    }, [loading]);

    return (
        <div>
         <a onClick={() => window.history.back()}>
        <i
          style={{ cursor: 'pointer', left: '5%' }}
          className="bi bi-arrow-left fs-3 text-dark position-absolute "
        ></i>
      </a>
            {loading || localLoading ? ( // Show loader while loading
                <div className="loader-container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div>
                    <h4 className='text-center text-capitalize my-3'>Your Wishlist</h4>
                    {wishlist?.length > 0 ? (
                        <div className="row justify-content-center mx-0">
                            {wishlist.map((product) => (
                                <div key={product.productId?._id} className="col-md-2 product-card h-100">
                                    <div className="image-container position-relative">
                                        <img
                                            onClick={() => { toProductDetailsPage(product?.productId?._id); }}
                                            alt={product.productId?.name}
                                            className="img primary"
                                            src={product?.productId.images[0]}
                                        />
                                        <img
                                            onClick={() => { toProductDetailsPage(product?.productId?._id); }}
                                            alt={`${product.productId?.name} Back`}
                                            className="secondary img"
                                            height="300"
                                            src={product?.productId.images[1]}
                                            width="220"
                                        />
                                        <button
                                            onClick={() => handleRemove(product?.productId._id)}
                                            className='border-0 text-danger fs-4 heart-button'>
                                            <i className='fa fa-heart heart-bg'></i>
                                        </button>
                                    </div>
                                    <div className="product-title text-left">{product.productId?.name}</div>
                                    <div className='product-price text-left fs-6 mb-3'>
                                        <span className='text-decoration-line-through small'>
                                            ₹{(Number(product.productId?.price) * 1.5).toFixed(2)}
                                        </span>
                                        <span className='mx-1 text-dark'>₹{Number(product.productId?.price).toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center my-5">
                            <p>Your wishlist is empty!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
