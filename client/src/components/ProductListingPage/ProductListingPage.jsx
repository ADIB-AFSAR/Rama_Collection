import React, { useEffect, useState } from 'react';
import './ProductListingPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProductStart } from '../../redux/action/product.action';
import { useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

function ProductListingPage() {
  const products = useSelector((state) => state.product.products);
  const isDesktop = useMediaQuery({ query: '(min-width: 786px)' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();

  // State for filters and sorting
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [loading, setLoading] = useState(true); // State for loader

  const filterOptions = {
    saree: ['Silk', 'Cotton', 'Handloom', 'Linen'],
    'salwar suit': ['Cotton', 'Chanderi', 'Zariwork', 'Silk'],
    material: ['Printed', 'Cotton', 'Threadwork', 'Silk'],
    occasion: ['Zariwork', 'Cotton', 'Silk', 'Threadwork', 'Salwar Suit', 'Saree'],
  };

  // Determine category based on URL
  const getCategoryFromPath = () => {
    if (category === 'saree') return 'saree';
    if (category === 'salwar suit') return 'salwar suit';
    if (category === 'material') return 'material';
    if (category === 'occasion') return 'occasion';
    return null; // Show all if no specific category is matched
  };

  const categoryFilter = getCategoryFromPath();

  const toProductDetailsPage = (id) => {
    navigate(`/details/${id}`);
  };

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching data
    dispatch(getProductStart());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0); 
    // Assuming products are fetched successfully, set loading to false
    if (products) {
      setLoading(false);
    }
  }, [products]);

  useEffect(() => {
    if (categoryFilter === 'occasion') {
      setPriceRange({ min: 0, max: 50000 });
    } else {
      setPriceRange({ min: 0, max: 10000 });
    }
  }, [categoryFilter]);

  useEffect(() => {
    let filtered = products?.filter((product) =>
      categoryFilter ? product?.category?.name === categoryFilter : true
    );

    // Apply category-specific title filter
    if (selectedFilter) {
      filtered = filtered?.filter((product) =>
        product?.name.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    }

    // Apply price range filter
    filtered = filtered?.filter(
      (product) =>
        product?.price >= priceRange.min && product?.price <= priceRange.max
    );

    // Apply sorting
    if (sortOrder === 'lowToHigh') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [products, categoryFilter, selectedFilter, sortOrder, priceRange]);

  return (
    <>
      <a onClick={() => window.history.back()}>
        <i
          style={{ cursor: 'pointer', left: '5%' }}
          className="bi bi-arrow-left fs-3 text-dark position-absolute "
        ></i>
      </a>
      <img
        className="d-block w-100"
        src={
          isDesktop
            ? '//naachiyars.in/cdn/shop/files/Site-offer-shipping.png?v=1728371856'
            : 'https://naachiyars.in/cdn/shop/files/Site-offer-shipping-mobile.png?v=1728371856'
        }
        alt={`Banner Image`}
      />
      <div className="container mx-auto px-0" style={{ width: '100%' }}>
        <div className="filters-section mb-4">
          {/* Filter Section */}
          <div className="row align-items-center">
            <div className="col-md-3 col-6 mb-2">
              <select
                className="form-select fw-semibold filter"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="">Filter by Type</option>
                {filterOptions[categoryFilter]?.map((filter, index) => (
                  <option key={index} value={filter.toLowerCase()}>
                    {filter}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Section */}
            <div className="col-md-3 col-6 mb-2">
              <select
                className="form-select fw-semibold sort"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="none">Sort by Price</option>
                <option value="lowToHigh">Price Low to High</option>
                <option value="highToLow">Price High to Low</option>
              </select>
            </div>
            {/* Price Range Section */}
            <div className="col-md-3 col-sm-6 mb-2">
              <div>
                <label htmlFor="priceRange" className="form-label fw-semibold range">
                  Price Range: ₹{priceRange.min} - ₹{priceRange.max}
                </label>
                <input
                  type="range"
                  id="priceRange"
                  className="form-range"
                  min={priceRange.min}
                  max={categoryFilter === 'occasion' ? 50000 : 10000} // Set max dynamically
                  step="100"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      max: Number(e.target.value), // Update max directly
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Display Loader while loading */}
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div> {/* Spinner */}
          </div>
        ) : (
          <div className="row justify-content-center">
            {filteredProducts?.length > 0 &&
              filteredProducts.map((product, index) => (
                <div key={index} className="col-lg-3 col-md-4 col-6 mb-4 product-card h-100">
                  {/* Ribbon for quantity less than 10 */}
                  {product.quantity < 10 && (
                    <div
                      className="position-absolute bg-danger left text-white py-1 px-2 mx-2 fw-bold"
                      style={{
                        top: '10px',
                        right: '10px',
                        borderRadius: '5px',
                        zIndex: 10,
                      }}
                    >
                      {product.quantity} left
                    </div>
                  )}
                  <img
                    onClick={() => {
                      toProductDetailsPage(product._id);
                    }}
                    alt={product?.name}
                    className="img primary"
                    src={product?.images[0]}
                  />
                  <img
                    onClick={() => {
                      toProductDetailsPage(product._id);
                    }}
                    alt={`${product.name} Back`}
                    className="secondary img"
                    height="300"
                    src={product?.images[1] || product?.images[0]}
                    width="220"
                  />
                  <div className="product-title text-left mb-1">{product?.name}</div>
                  <div className="product-price text-left fs-6">
                    <span className="mx-1 text-dark">
                      ₹{Number(product?.price).toFixed(2)}
                    </span>
                    <span className="text-decoration-line-through small">
                      ₹{(Number(product?.price) * 1.5).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ProductListingPage;
