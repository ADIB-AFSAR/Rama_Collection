import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shopcat.css";
import { getProductStart } from "../../redux/action/product.action";
import { getWishListStart } from "../../redux/action/wishlist.action";

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
  const [loadingProducts, setLoadingProducts] = useState(true); // Track if products are loading
  const [loadingImages, setLoadingImages] = useState({}); // Track image loading state for each product
  const products = useSelector((state) => state.product.products);
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
     if (products?.length > 0) {
      setShuffledProducts(shuffleArray(products));
      setLoadingProducts(false); // Products are loaded, stop the product loader
    }
  }, [products, currentUser, navigate]);

  const toProductListingPage = (category) => {
    navigate(`/new/${category}/collections`);
  };
  console.log(products)
  const handleImageLoad = (productId) => {
    setLoadingImages((prevState) => ({
      ...prevState,
      [productId]: false, // Mark image as loaded
    }));
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(getWishListStart(currentUser.id));
    }
  }, [currentUser, dispatch]);

  const renderCategorySection = (categoryName) => {
    const categoryProducts = shuffledProducts?.filter(
      (product) => product.category.name === categoryName
    );
    return (
      <div className="category-section mb-5">
        <h5 className="text-center mb-3 satisfy-regular fs-1 text-capitalize">{categoryName}</h5>
        <div className="row">
          {categoryProducts.map((product, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-6 mb-4" key={index}>
              <div className="card position-relative">
                {/* Ribbon for quantity less than 10 */}
                {product.quantity < 10 && (
                  <div
                    className="position-absolute bg-danger text-white py-1 px-2 fw-bold"
                    style={{
                      top: "10px",
                      right: "10px",
                      borderRadius: "5px",
                      zIndex: 10,
                    }}
                  >
                    {product.quantity} left
                  </div>
                )}

                {/* Image with loader */}
                <div className="image-container position-relative">
                  {/* Loader visibility */}
                  {loadingImages[product.id] && (
                    <div
                      className="image-loader position-absolute w-100 h-100 bg-light d-flex justify-content-center align-items-center"
                      style={{ display: "block" }}
                    >
                      <div className="spinner-border text-primary" role="status"></div>
                    </div>
                  )}
                  <img
                    onClick={() => toProductListingPage(product.category.name)}
                    src={product.images[0]}
                    alt={product.name}
                    className="card-img-top"
                    onLoad={() => handleImageLoad(product.id)} // Hide loader on image load
                    onMouseOver={(e) => (e.currentTarget.src = product.images[1] || product.images[0])}
                    onMouseOut={(e) => (e.currentTarget.src = product.images[0])}
                  />
                </div>

                <div className="card-body p-0">
                  <h5 className="card-title text-left text-capitalize">{product.name}</h5>
                  <div className="product-price text-left">
                    <span className="text-dark">₹{Number(product?.price).toFixed(2)}</span>
                    <span className="mx-1 text-decoration-line-through small">
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

      {/* Show loader for products if loading */}
      {loadingProducts ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <>
          {renderCategorySection("saree")}
          {renderCategorySection("salwar suit")}
          {renderCategorySection("material")}
          {renderCategorySection("occasion")}
        </>
      )}

      <button onClick={() => toProductListingPage("all")} className="rewards-button position-sticky float-end">
        View All
      </button>
    </div>
  );
};

export default ShopCategory;
