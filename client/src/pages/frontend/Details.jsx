import React, { useEffect, useState } from 'react';
import PhotoSection from '../../components/ProductDetails/PhotoSection';
import DetailsSection from '../../components/ProductDetails/DetailsSection'; 
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductStart } from '../../redux/action/product.action';
import CartSidebar from './Cart';
 // const images = [
  //   "//www.snitch.co.in/cdn/shop/files/fe2806d19f8e17ed71b311581674ea1d.jpg?v=1727765285&width=1080",
  //   "//www.snitch.co.in/cdn/shop/files/ef2e262a1f4eed25c1d5634bea422630.jpg?v=1727765285&width=1080",
  //   "//www.snitch.co.in/cdn/shop/files/1fe0c0f4241cd8322127138e7f5bb748.jpg?v=1727765285&width=1080",
  //   "//www.snitch.co.in/cdn/shop/files/3cbef211a93a2fadfb858950b89146f6.jpg?v=1727765285&width=1080",
  //   "//www.snitch.co.in/cdn/shop/files/c8c79d1bc80600e86002ef517fec6ec1.jpg?v=1727765285&width=1080"
  // ];

const ProductDetailsPage = () => {
  const products = useSelector(state => state.product.products);
  const [CurrentProductDetails , setCurrentProductDetails] = useState() 
  const [CurrentProductImages , setCurrentProductImages] = useState()
  const {id} = useParams()  

 
 useEffect(() => {
   if (id) {
    console.log(products)
    const getProductById = (id) => {
      const fetched = products?.find((product) => product?._id === id);
      setCurrentProductDetails(fetched);
      setCurrentProductImages(fetched?.images || []); 
    };
    getProductById(id); // Call the function here
  }
}, [id,  ]); // Ensure that the effect re-runs when `products` or `id` changes

  return (
    <div className="container my-5">
    <a href='/'><i className='bi bi-arrow-left fs-3 text-dark'></i></a>
      <div className="row">
      
        {/* PhotoSection will take half width on larger screens, full width on mobile */}
        <div className="col-12 col-lg-6 mb-3">
        {CurrentProductImages && CurrentProductImages?.length > 0 ? (
            <PhotoSection CurrentProductImages={CurrentProductImages} />
          ) : (
            <p className='d-flex justify-content-center fw-semibold'>Loading images...</p> // Optional loading state
          )}
        </div>
        
        {/* DetailsSection will take half width on larger screens, full width on mobile */}
        <div className="col-12 col-lg-6">
        {CurrentProductDetails && 
            <DetailsSection CurrentProductDetails={CurrentProductDetails}/>
           }
        </div>
      </div>
    </div>
 
  );
};

export default ProductDetailsPage;
