import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./seasonalfav.css";  

const SeasonalFaves = () => {
  return (
    <div className="container">
      <div className="section-title">
        SEASONAL FAVS <span className="emoji">🌟</span>
      </div>
      <div className="row">
        <div className="col-md-3">
          <a href="#" className="text-decoration-none">
            <div className="card">
              <img
                src="//www.snitch.co.in/cdn/shop/files/3_Shirts.jpg?v=1729318475&width=1080"
                alt="A man wearing a white shirt"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">LUXE COLLECTION</h5>
              </div>
            </div>
          </a>
        </div>
        <div className="col-md-3">
          <a href="#" className="text-decoration-none">
            <div className="card">
              <img
                src="//www.snitch.co.in/cdn/shop/files/Trousers_2.jpg?v=1728392353&width=1080"
                alt="A pair of beige trousers"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">TROUSERS</h5>
              </div>
            </div>
          </a>
        </div>
        <div className="col-md-3">
          <a href="#" className="text-decoration-none">
            <div className="card">
              <img
                src="//www.snitch.co.in/cdn/shop/files/Cargo_2.jpg?v=1725094010&width=1080"
                alt="A pair of black cargo pants"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">CARGOS</h5>
              </div>
            </div>
          </a>
        </div>
        <div className="col-md-3">
          <a href="#" className="text-decoration-none">
            <div className="card">
              <img
                src="//www.snitch.co.in/cdn/shop/files/1_Tees.jpg?v=1723789034&width=1080"
                alt="A man wearing a red oversized t-shirt"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">OVERSIZED TEES</h5>
              </div>
            </div>
          </a>
        </div>
      </div> 
    </div>
  );
};

export default SeasonalFaves;
