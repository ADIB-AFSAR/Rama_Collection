import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./seasonalfav.css";  
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SeasonalFaves = () => {
  const categories = useSelector((state) => state.category.categories);
    const isLoading = useSelector((state) => state.category.loading);
  console.log(categories)
  const navigate = useNavigate()
  const toProductListingPage = (category) => {
    navigate(`/new/${category}/collections`);
  };
  useEffect(()=>{
console.log("isLoading?",isLoading)
  },[isLoading])
  
  return (
    <div className="container mx-auto px-0">
      <div className="section-title">
        Shop By Collections
      </div>
      <div className="row">
        {isLoading
  ? Array(4).fill().map((_, index) => (
      <div key={index} className="col-md-3 col-6 mb-4">
        <div className="card placeholder-card">
          <div className="skeleton-image" />
          <div className="card-body">
            <div className="skeleton-text" />
          </div>
        </div>
      </div>
    ))
  : categories && categories.map((category, index) => (
      <div key={index} className="col-md-3 col-6 mb-4" onClick={() => toProductListingPage(category?.name)}>
        <a className="text-decoration-none">
          <div className="card">
            <img
              src={category?.image}
              alt={category?.name}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title text-overlay">{category?.name}</h5>
            </div>
          </div>
        </a>
      </div>
    ))}

      </div> 
    </div>
  );
};

export default SeasonalFaves;
