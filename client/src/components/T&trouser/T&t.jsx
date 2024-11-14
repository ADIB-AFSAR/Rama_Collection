import React, { useEffect, useState } from 'react';
import './t&t.css'
import { useDispatch, useSelector } from 'react-redux';
import { getProductStart } from '../../redux/action/product.action';
import { useNavigate } from 'react-router-dom';

   
function TshrtTrouserComp() {
  // const [filterType, setFilterType] = useState('all') 
  const products = useSelector(state => state.product.products); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const size = ['S','M','XL','XXL']
  console.log(products)

  const toProductDetailsPage = (id)=>{
    navigate(`/details/${id}`)
}

  
  // const handleFilter = (type) => {
  //   setFilterType(type); // update filter type on button click
  // };

  // const filteredProducts = products?.filter((product) => {
  //   if (filterType === 'all') {
  //     return true; // show all products when filterType is 'all'
  //   }
  //   return product.type === filterType; // filter based on the selected type
  // });
  useEffect(()=>{
   dispatch(getProductStart())
  },[dispatch])

  return (
    <div className="container">
      <div className="row justify-content-center">
        {products?.length > 0 && products?.filter(product => product?.category?.name === 'Tshirt' || product?.category?.name === "Joggers").map((product,index) => (
          <div key={index} className="col-md-2 product-card h-100">
            <img onClick={()=>{toProductDetailsPage(product._id)}} alt={product?.name} className="img primary" src={process.env.REACT_APP_API_URL +product?.images[0]} />
            <img onClick={()=>{toProductDetailsPage(product._id)}} alt={`${product.name} Back`} className="secondary img" height="300" src={process.env.REACT_APP_API_URL +product?.images[1]} width="220" />
            <div className="product-title text-left mb-1">{product?.name}</div>
            <div className='product-price text-left fs-6'><span className='text-decoration-line-through small'>
            ₹{(Number(product?.price) * 1.5).toFixed(2) }
          </span><span className='mx-1 text-dark'>₹{ Number(product?.price).toFixed(2) }</span>  </div>            
          <div className="product-sizes text-left m-0 p-0 mb-3">
              {size && size.map((size, index) => (
                <span className='me-2 pl-2 text-muted text-dark' key={index}>{size}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

  

export default TshrtTrouserComp;