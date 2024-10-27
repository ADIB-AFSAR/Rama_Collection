import React, { useEffect, useState } from 'react';
import './t&t.css'
import { useDispatch, useSelector } from 'react-redux';
import { getProductStart } from '../../redux/action/product.action';
import { useNavigate } from 'react-router-dom';

  // const products = [
  //   {
  //     imgSrc: "//www.snitch.co.in/cdn/shop/files/7e13bda1da605cc4d782f2037abcde18.jpg?v=1728375628",
  //     imgAlt: "Blue Stitchless Polo T-Shirt",
  //     imgSecondarySrc: "//www.snitch.co.in/cdn/shop/files/4MST2243-0213.jpg?v=1729510664",
  //     imgSecondaryAlt: "Blue Stitchless Polo T-Shirt Back",
  //     title: "Blue Stitchless Polo T-Shirt",
  //     price: "1399",
  //     sizes: ["S" ,"M" ,"L", "XL" ,"XXL"],
  //     type: "trending",
  //     category : "tshirt" 
  //   },
  //   {
  //     imgSrc: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MST2426-0239.jpg?v=1728391885",
  //     imgAlt: "Dark Grey Stitchless Polo T-Shirt",
  //     imgSecondarySrc: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MST2426-0218.jpg?v=1728391886",
  //     imgSecondaryAlt: "Dark Blue Stitchless Polo T-Shirt Back",
  //     title: "Dark Grey Stitchless Polo T-Shirt",
  //     price: "1399",
  //     sizes: ["S" ,"M" ,"L", "XL" ,"XXL"],
  //     type: "trending",
  //     category : "tshirt" 
  //   },
  //   {
  //     imgSrc: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/2915d61f237cc7b8358886f8a894dd57.jpg?v=1729087350",
  //     imgAlt: "Cream Stitchless Polo T-Shirt",
  //     imgSecondarySrc: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/415770151af0135fcb2700b7fbba2474.jpg?v=1729087350",
  //     imgSecondaryAlt: "Green Stitchless Polo T-Shirt Back",
  //     title: "Green Stitchless Polo T-Shirt",
  //     price: "1399",
  //     sizes: ["S" ,"M" ,"L", "XL" ,"XXL"],
  //     type: "trending",
  //     category : "tshirt" 
  //   },
  //   {
  //     imgSrc: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MST2459-0122.jpg?v=1727273526",
  //     imgAlt: "Green Relaxed Fit Korean Trousers",
  //     imgSecondarySrc: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MST2459-011.jpg?v=1727273526",
  //     imgSecondaryAlt: "Green Relaxed Fit Korean Trousers Back",
  //     title: "Floral Relaxed Fit Korean T-shirt",
  //     price: "1799",
  //     sizes: ["S" ,"M" ,"L", "XL" ,"XXL"],
  //     type: "newdrop",
  //     category : "tshirt" 
  //   },
  //   {
  //     imgSrc: "//www.snitch.co.in/cdn/shop/files/fe2806d19f8e17ed71b311581674ea1d.jpg?v=1727765285",
  //     imgAlt: "Dark Blue Textured Polo T-Shirt",
  //     imgSecondarySrc: "//www.snitch.co.in/cdn/shop/files/ef2e262a1f4eed25c1d5634bea422630.jpg?v=1727765285",
  //     imgSecondaryAlt: "Dark Blue Textured Polo T-Shirt Back",
  //     title: "White Blue Textured Polo T-Shirt",
  //     price: "1399",
  //     sizes: ["S" ,"M" ,"L", "XL" ,"XXL"],
  //     type: "trending",
  //     category : "tshirt" 
  //   },
  //   {
  //     imgSrc: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/0ee5f471ea311766f5583fe375902942.jpg?v=1726117291",
  //     imgAlt: "Black Stitchless Polo T-Shirt",
  //     imgSecondarySrc: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/efea165faf8ef264793b42f3c2cc52ad.jpg?v=1726117291",
  //     imgSecondaryAlt: "Black Stitchless Polo T-Shirt Back",
  //     title: "Black Stitchless Polo T-Shirt",
  //     price: "1399",
  //     sizes: ["S" ,"M" ,"L", "XL" ,"XXL"],
  //     type: "trending",
  //     category : "tshirt" 
  //   },
  //   {
  //     imgSrc: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/915f59da9aec36790bcd672ca4897b13.jpg?v=1729258485",
  //     imgAlt: "White Stitchless Polo T-Shirt",
  //     imgSecondarySrc: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/3a02cca69ec9dc2c17d662f3bde76714.jpg?v=1729258485",
  //     imgSecondaryAlt: "White Stitchless Polo T-Shirt Back",
  //     title: "Brown Stitchless Polo T-Shirt",
  //     price: "1399",
  //     sizes: ["S" ,"M" ,"L", "XL" ,"XXL"],
  //     type: "newdrop",
  //     category : "tshirt" 
  //   },
  //   {
  //     imgSrc: "//www.snitch.co.in/cdn/shop/files/89e0287f4c1a8f5c38f5964031d14b09.webp?v=1716898838&width=1080",
  //     imgAlt: "Grey Stitchless Polo T-Shirt",
  //     imgSecondarySrc: "//www.snitch.co.in/cdn/shop/files/87c41dae2ee6185442932a5957081aaa.webp?v=1716898838&width=1080",
  //     imgSecondaryAlt: "Grey Stitchless Polo T-Shirt Back",
  //     title: "Khadi Stitchless Joggers",
  //     price: "1399",
  //     sizes: ["S" ,"M" ,"L", "XL" ,"XXL"],
  //     type: "trending",
  //     category : "joggers" 
  //   },
  //   {
  //     imgSrc: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/5ca27124f14fe3b850e0759e305ba34b.jpg?v=1728375576",
  //     imgAlt: "Red Relaxed Fit Korean Trousers",
  //     imgSecondarySrc: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/9aa6deb5c050dfcfaae62392b4623d91.jpg?v=1728375576",
  //     imgSecondaryAlt: "Red Relaxed Fit Korean Trousers Back",
  //     title: "Red Relaxed Fit Korean T-Shirt",
  //     price: "1799",
  //     sizes: ["S" ,"M" ,"L", "XL" ,"XXL"],
  //     type: "newdrop",
  //     category : "tshirt" 
  //   },
  //   {
  //     imgSrc: "//www.snitch.co.in/cdn/shop/files/91a3c7fe6477160729a5375580c4be69.jpg?v=1713793890&width=1080",
  //     imgAlt: "Yellow Textured Polo T-Shirt",
  //     imgSecondarySrc: "//www.snitch.co.in/cdn/shop/files/604a02be827e5a5f29c22d35ca8f6d2e.jpg?v=1713793890&width=1080",
  //     imgSecondaryAlt: "Yellow Textured Polo T-Shirt Back",
  //     title: "Yellow Textured Joggers",
  //     price: "1399",
  //     sizes: ["S" ,"M" ,"L", "XL" ,"XXL"],
  //     type: "trending",
  //     category : "joggers" 
  //   },
  // ];

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
      {/* <div className="nav-buttons">
        <button 
          className={filterType === 'newdrop' ? 'active' : ''} 
          onClick={() => handleFilter('newdrop')}
        >
          NEW DROPS
        </button>
        <button 
          className={filterType === 'trending' ? 'active' : ''} 
          onClick={() => handleFilter('trending')}
        >
          MOST TRENDING
        </button>
        <button 
          className={`my-1 ${filterType === 'all' ? 'active' : ''} `}
          onClick={() => handleFilter('all')}
        >
          SHOW ALL
        </button>
      </div> */}
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