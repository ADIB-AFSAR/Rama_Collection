import React, { useEffect, useState } from 'react';
import PhotoSection from '../../components/ProductDetails/PhotoSection';
import DetailsSection from '../../components/ProductDetails/DetailsSection'; 
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductStart } from '../../redux/action/product.action';

const ProductDetailsPage = () => {
  const products = useSelector((state) => state.product.products);
  const [currentProductDetails, setCurrentProductDetails] = useState(null);
  const [currentProductImages, setCurrentProductImages] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { id } = useParams();
  const dispatch = useDispatch();

useEffect(() => {
  window.scrollTo(0, 0); 
  if (products?.length === 0) {
    dispatch(getProductStart());
  }
}, [products, dispatch]);


  useEffect(() => {
    if (id && products?.length > 0) {
      // Log to debug
      
      // Find the product by ID
      const fetched = products.find((product) => product?._id === id);
      if (fetched) {
        setCurrentProductDetails(fetched);
        setCurrentProductImages(fetched.images || []);
      } else {
        console.warn(`Product with ID ${id} not found.`);
      }
      setLoading(false); // Stop loading
    } else if (products?.length === 0) {
      setLoading(true); // Wait for products to load
    }
  }, [id, products]);

  return (
    <> <a onClick={() => window.history.back()}>
        <i
          style={{ cursor: 'pointer', left: '5%' }}
          className="bi bi-arrow-left fs-3 text-dark position-absolute "
        ></i>
      </a>
       <div className="container my-5">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        currentProductDetails ? (
          <div className="row">
            <div className="col-12 col-lg-6 mb-3">
              {currentProductImages.length > 0 ? (
                <PhotoSection CurrentProductImages={currentProductImages} />
              ) : (
                <p className="d-flex justify-content-center fw-semibold">No images available.</p>
              )}
            </div>
            <div className="col-12 col-lg-6">
              <DetailsSection CurrentProductDetails={currentProductDetails} />
            </div>
          </div>
        ) : (
          <p className="text-center text-danger">Product not found.</p>
        )
      )}
    </div></>

  );
};

export default ProductDetailsPage;
