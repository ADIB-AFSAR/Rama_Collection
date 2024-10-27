// Wishlist.jsremoveFromWishlist
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWishListStart, removeFromWishlistStart} from '../../redux/action/wishlist.action';
import { useNavigate } from 'react-router-dom';
import './frontend.css'

const Wishlist = () => {
    const wishlist = useSelector(state => state.wishlist.items);
     const currentUser = useSelector(state => state.user.currentUser)
     const dispatch = useDispatch();
     const navigate = useNavigate()
     console.log(wishlist)

     const handleRemove = (productId) => {
        const userId = currentUser.id
        dispatch(removeFromWishlistStart({userId,productId}));
        localStorage.removeItem(`wishlist-${productId}`);
        window.location.reload()
    };
    const toProductDetailsPage = (id)=>{
        navigate(`/details/${id}`)
    }
    useEffect(() => {
        if(!currentUser?.name){
            navigate('/login') 
        }
        if (currentUser?.id) {
            dispatch(getWishListStart(currentUser.id));
        }
    }, [currentUser, wishlist?.length , dispatch]);

    return (
        <div>
            <h2 className='text-center my-3'>Your Wishlist</h2>
            <ul>
            <div className="row justify-content-center mx-0">
            {wishlist?.length > 0 && wishlist?.map((product) => (
    <div key={product.productId?.id} className="col-md-2 product-card h-100">
        <div className="image-container position-relative">
            <img onClick={() => { toProductDetailsPage(product._id) }} 
                 alt={product.productId?.name} 
                 className="img primary" 
                 src={process.env.REACT_APP_API_URL + product?.productId.images[0]} />
            <img onClick={() => { toProductDetailsPage(product._id) }} 
                 alt={`${product.productId?.name} Back`} 
                 className="secondary img" 
                 height="300" 
                 src={process.env.REACT_APP_API_URL + product?.productId.images[1]} 
                 width="220" />
            <button onClick={()=>handleRemove(product?.productId._id)} className='border-0 text-danger fs-4 heart-button'>
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
            </ul>
        </div>
    );
};

export default Wishlist;