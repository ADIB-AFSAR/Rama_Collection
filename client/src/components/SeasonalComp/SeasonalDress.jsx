import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./seasonalfav.css";  
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SeasonalFaves = () => {
  const categories = useSelector((state) => state.category.categories);
  console.log(categories)
  const navigate = useNavigate()
  const toProductListingPage = (category) => {
    navigate(`/new/${category}/collections`);
  };
  return (
    <div className="container mx-auto px-0">
      <div className="section-title">
        Shop By Collections
      </div>
      <div className="row">
        {categories && categories.map((category,index)=>{
          return<div key={index} className="col-md-3 col-6" onClick={()=>toProductListingPage(category?.name)}>
          <a className="text-decoration-none">
            <div className="card">
              <img
                src={category?.image}
                alt={category?.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title  text-overlay text-dark">{category?.name}</h5>
              </div>
            </div>
          </a>
        </div>
        })}
      </div> 
    </div>
  );
};

export default SeasonalFaves;
