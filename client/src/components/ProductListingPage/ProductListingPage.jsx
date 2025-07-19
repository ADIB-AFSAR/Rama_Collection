import React, { useEffect, useState } from 'react';
import './ProductListingPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProductStart } from '../../redux/action/product.action';
import { useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { getToken } from '../../redux/service/token.service';
import { Spinner } from 'react-bootstrap';
import SkeletonLoader from '../SkeletonLoader/skeletonLoader';

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
  const [bannerUrl, setBannerUrl] = useState('');
    const [loadingImages, setLoadingImages] = useState({}); // Track image loading state for each product
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

  const handleImageLoad = (productId) => {
    setLoadingImages((prevState) => ({
      ...prevState,
      [productId]: false, // Mark image as loaded
    }));
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
     if (categoryFilter === 'occasion' || "saree") {
      setPriceRange({ min: 0, max: 50000 });
    } else {
      setPriceRange({ min: 0, max: 15000 });
    }
  }, [categoryFilter]);

  useEffect(() => {
    const fetchBanner = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/banner/all`, {
          headers: {
            Authorization: getToken(),
          },
        });

        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error('Unexpected response format:', data);
          return;
        }

        const deviceType = isDesktop ? 'desktop' : 'mobile';

        const banner = data.find(
          (img) =>
            img.device?.toLowerCase() === deviceType &&
            img.type?.toLowerCase() === 'banner'
        );

        if (banner) {
          setBannerUrl(banner.url);
        }
      } catch (err) {
        console.error('Failed to load banner image:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [isDesktop]);

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
        bannerUrl ||
        (isDesktop
          ? '//naachiyars.in/cdn/shop/files/Site-offer-shipping.png?v=1728371856'
          : 'https://naachiyars.in/cdn/shop/files/Site-offer-shipping-mobile.png?v=1728371856')
      }
      alt="Banner Image"
      style={{ height: '300px',objectFit:"cover"}}
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
                  max={categoryFilter === 'occasion' || "saree" ? 50000 : 15000} // Set max dynamically
                  step="1000"
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
          <SkeletonLoader/>
        ) : (
          <div className="row justify-content-center">
            {filteredProducts?.filter(product => product?.status).length > 0 ? (
  filteredProducts
    .filter(product => product?.status)
    .map((product, index) => (
      <div className="col-lg-3 col-md-4 col-sm-6 col-6 mb-4" key={index}>
        <div className={`card position-relative ${product.quantity <= 0 ? 'fade-card' : ''}`}>

          {/* Ribbon for quantity less than 10 */}
          {product.quantity > 0 && product.quantity < 10 && (
            <div className="stock-badge bg-warning text-dark">
              {product.quantity} left
            </div>
          )}

          {product.quantity <= 0 && (
            <div className="stock-badge bg-danger text-white">
              Out of Stock
            </div>
          )}

          {/* Image with loader */}
          <div
            className="image-container position-relative"
            onClick={() => toProductDetailsPage(product._id)}
          >
            {loadingImages[product._id] && (
              <div className="image-loader position-absolute w-100 h-100 bg-light d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status"></div>
              </div>
            )}

            <img
              src={product.images[0]}
              alt={product.name}
              className="product-image primary"
              onLoad={() => handleImageLoad(product._id)}
            />
            <img
              src={product.images[1] || product.images[0]}
              alt={product.name}
              className="product-image secondary"
            />
          </div>

          <div className="card-body p-0">
            <h5 className="card-title mx-1 quicksand product-name text-left text-capitalize">
              {product.name}
            </h5>
            <div className="product-price text-left">
              <span className="text-dark  mx-1 quicksand fw-semibold">₹{Number(product?.price).toFixed(2)}</span>
              <span className="mx-1 text-decoration-line-through small">
                ₹{(Number(product?.price) * 1.5).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    ))
) : (
  <div className="text-center text-muted fs-5 py-5">No products to show</div>
)}

          </div>
        )}
      </div>
    </>
  );
}

export default ProductListingPage;
