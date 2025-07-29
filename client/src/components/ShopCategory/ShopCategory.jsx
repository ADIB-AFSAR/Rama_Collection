import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shopcat.css";
import { getProductStart } from "../../redux/action/product.action";
import { getWishListStart } from "../../redux/action/wishlist.action";
import { getCategoryStart } from "../../redux/action/category.action";
import SkeletonLoader from "../SkeletonLoader/skeletonLoader";

const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const ShopCategory = () => {
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [loadingImages, setLoadingImages] = useState({}); // Track image loading state for each product
  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.category.categories);
  const currentUser = useSelector((state) => state.user.currentUser);
  const isFetching = useSelector((state) => state.product.isFetching);
  const navigate = useNavigate();
  const dispatch = useDispatch()


 useEffect(() => {
  if (products && products.length > 0) {
    setShuffledProducts(shuffleArray(products));
  }
}, [products]);
  

  const toProductListingPage = (category) => {
    navigate(`/new/${category}/collections`);
  };
   const handleImageLoad = (productId) => {
    setLoadingImages((prevState) => ({
      ...prevState,
      [productId]: false, // Mark image as loaded
    }));
  };

  useEffect(() => {
    dispatch(getProductStart())
    dispatch(getCategoryStart())
     if (currentUser) {
      dispatch(getWishListStart(currentUser.id));
    }
  }, [currentUser, dispatch]);
  useEffect(() => {
  if (products?.length > 0) {
    const initialLoadingState = products.reduce((acc, product) => {
      acc[product._id] = true;
      return acc;
    }, {});
    setLoadingImages(initialLoadingState);
  }
}, [products]);

 

useEffect(() => {
  const timeouts = shuffledProducts.map((product) => {
    return setLoadingImages((prevState) => ({
        ...prevState,
        [product._id]: false, // Hide loader after timeout
      }));
  });

  return () => timeouts.forEach((timeout) => clearTimeout(timeout));
}, [shuffledProducts]);

  const renderCategorySection = (categoryName) => {
    const categoryProducts = shuffledProducts?.filter(
      (product) => product.category?.name === categoryName
    );  
    return (
      <div className="category-section mb-5">
        <h5 className="text-center mb-3 satisfy-regular fs-1 text-capitalize">{categoryName}</h5>
         <div className="row">
          {categoryProducts
  .filter(product => product?.status === true) // only active products
  .map((product, index) => (
    <div className="col-lg-3 col-md-4 col-sm-6 col-6 mb-4" key={product._id}>
      <div className={`card position-relative ${product.quantity <= 0 ? 'fade-card' : ''}`}>
        
        {/* Ribbon for quantity less than 10 and more than 0 */}
        {product.quantity > 0 && product.quantity < 10 && (
          <div className="stock-badge bg-warning text-dark">
            {product.quantity} left
          </div>
        )}

        {product.quantity <= 0 && (
          <div className="stock-badge bg-danger text-white">
            Out of Stock
          </div>
        )}

        {/* Image with loader */}
        <div
          className="image-container position-relative"
          onClick={() => toProductListingPage(product.category.name)}
        >
          {loadingImages[product._id] && (
            <div className="image-loader position-absolute w-100 h-100 bg-light d-flex justify-content-center align-items-center">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          )}

          <img
            src={product.images[0]}
            alt={product.name}
            className="product-image primary"
            onLoad={() => handleImageLoad(product._id)}
          />
          <img
            src={product.images[1] || product.images[0]}
            alt={product.name}
            className="product-image secondary"
          />
        </div>

        <div className="card-body p-0">
          <h5 className="card-title mx-1 quicksand product-name text-left text-capitalize">
            {product.name}
          </h5>
          <div className="product-price text-left">
            <span className="text-dark quicksand mx-1 fw-semibold">₹{Number(product?.price).toFixed(2)}</span>
            <span className="mx-1 fw-semibold text-decoration-line-through small">
              ₹{(Number(product?.price) * 1.5).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
))}
 
        </div>
        
      </div>
    );
  };

  return (
  <div className="container mx-auto px-0">
    <p className="text-center mb-4">
      <span className="text-center ribbon-heading">Shop By Category</span>
    </p>

    {isFetching ? (
      // Show global loader only once before categories load
      <SkeletonLoader/>
    ) : (
      <>
        {categories.length > 0 && categories.map((category,index) => {
           return <div key={index}>{renderCategorySection(category?.name)}</div>
        })}
      </>
    )}

    <button onClick={() => toProductListingPage("all")} className="rewards-button position-sticky float-end">
      View All
    </button>
  </div>
);

};

export default ShopCategory;
