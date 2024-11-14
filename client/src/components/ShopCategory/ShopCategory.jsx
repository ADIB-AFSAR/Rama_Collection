import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shopcat.css"; // Contains card styles

// Shuffle function
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
  const products = useSelector((state) => state.product.products);
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser?.name) {
      navigate("/login");
    }
    if (products?.length > 0) {
      setShuffledProducts(shuffleArray(products));
    }
  }, [products, currentUser, navigate]);

  const toProductDetailsPage = (id) => {
    navigate(`/details/${id}`);
  };

  const renderCategorySection = (categoryName) => {
    const categoryProducts = shuffledProducts.filter(
      (product) => product.category.name === categoryName
    );

    return (
      <div className="category-section mb-5">
        <h5 className="text-center mb-3">{categoryName}</h5>
        <div className="row">
          {categoryProducts.map((product, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
              <div className="card">
                <img
                  onClick={() => toProductDetailsPage(product._id)}
                  src={product.images[0]}
                  alt={product.name}
                  className="card-img-top"
                  onMouseOver={(e) => (e.currentTarget.src = product.images[1] || product.images[0])}
                  onMouseOut={(e) => (e.currentTarget.src = product.images[0])}
                />
                <div className="card-body pb-3 pt-0">
                  <h5 className="card-title text-left">{product.name}</h5>
                  <div className="product-price text-left fs-6">
                    <span className="text-decoration-line-through small">
                      ₹{(Number(product?.price) * 1.5).toFixed(2)}
                    </span>
                    <span className="mx-1 text-dark">
                      ₹{Number(product?.price).toFixed(2)}
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
    <div className="container">
      <h4 className="text-center mb-4">Shop By Category</h4>
      {renderCategorySection("saree")}
      {renderCategorySection("salwar suit")}
      {renderCategorySection("material")}
      <button className="rewards-button position-sticky float-end">Rewards</button>
    </div>
  );
};

export default ShopCategory;
