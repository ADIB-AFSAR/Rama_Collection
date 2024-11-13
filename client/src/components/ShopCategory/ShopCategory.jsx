import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import "./shopcat.css"; // This will contain your card styles
import { useNavigate } from "react-router-dom";

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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const products = useSelector(state => state.product.products);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [activeType, setActiveType] = useState("all");
  const navigate = useNavigate()

  // Shuffle and display all products initially
  useEffect(() => {
    if(!currentUser?.name){
      navigate('/login')
    }
    if(products?.length>0){
      setFilteredProducts(shuffleArray(products));
    }
  }, [products]);
  
  const toProductDetailsPage = (id) => {
    navigate(`/details/${id}`)
  };
  
  const size = ['S', 'M', 'XL', 'XXL'];

  const filterProducts = (type) => {
    setActiveType(type);
    if (type === "all") {
      setFilteredProducts(shuffleArray(products).filter(product => product?.category?.name !== "Tshirt"));
    } else {
      const filtered = products.filter((product) => product.category.name === type);
      setFilteredProducts(shuffleArray(filtered));
    }
  };

  return (
    <div className="container">
      <h4 className="text-center mb-2">Shop By Category</h4>
      <div className="filter-buttons text-center mb-4">
        <button
          className={`btn btn-outline-dark mx-2 ${activeType === "all" ? "active" : ""}`}
          onClick={() => filterProducts("all")}
        >
          All
        </button>
        <button
          className={`btn btn-outline-dark mx-2 ${activeType === "Jeans" ? "active" : ""}`}
          onClick={() => filterProducts("Jeans")}
        >
          Jeans
        </button>
        <button
          className={`btn btn-outline-dark mx-2 ${activeType === "Shirt" ? "active" : ""}`}
          onClick={() => filterProducts("Shirt")}
        >
          Shirt
        </button>
        <button
          className={`btn btn-outline-dark mx-2 ${activeType === "Joggers" ? "active" : ""}`}
          onClick={() => filterProducts("Joggers")}
        >
          Joggers
        </button>
      </div>
      <div className="row">
        {filteredProducts.map((product, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
            <div className="card">
              <img
                onClick={() => { toProductDetailsPage(product._id) }}
                src={product.images[0]}
                alt={product.name}
                className="card-img-top"
                onMouseOver={(e) => (e.currentTarget.src = product.images[1])}
                onMouseOut={(e) => (e.currentTarget.src = product.images[0])}
              />
              <div className="card-body pb-3 pt-0">
                <h5 className="card-title text-left">{product.name}</h5>
                <div className='product-price text-left fs-6'>
                  <span className='text-decoration-line-through small'>
                    ₹{(Number(product?.price) * 1.5).toFixed(2)}
                  </span>
                  <span className='mx-1 text-dark'>
                    ₹{Number(product?.price).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="rewards-button position-sticky float-end">Rewards</button>
    </div>
  );
};

export default ShopCategory;
