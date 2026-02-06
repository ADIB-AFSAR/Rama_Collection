import React, { useEffect, useState } from 'react';
import './ProductListingPage.css';

import { useDispatch, useSelector } from 'react-redux';
import { getProductStart } from '../../redux/action/product.action';

import { useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { getToken } from '../../redux/service/token.service';
import SkeletonLoader from '../SkeletonLoader/skeletonLoader';

function ProductListingPage() {

  const { id } = useParams(); // ✅ category id from URL

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.product.products);

  const isDesktop = useMediaQuery({ query: '(min-width: 786px)' });

  // ---------------- STATES ----------------

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [sortOrder, setSortOrder] = useState('none');

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 50000,
  });

  const [loadingImages, setLoadingImages] = useState({});

  const [bannerUrl, setBannerUrl] = useState('');

  const [loading, setLoading] = useState(true);

  // ---------------- FETCH PRODUCTS ----------------

  useEffect(() => {
    setLoading(true);
    dispatch(getProductStart());
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      setLoading(false);
    }
  }, [products]);

  // ---------------- IMAGE LOADER ----------------

  const handleImageLoad = (productId) => {
    setLoadingImages((prev) => ({
      ...prev,
      [productId]: false,
    }));
  };

  useEffect(() => {
    if (products?.length > 0) {
      const initial = {};

      products.forEach((p) => {
        initial[p._id] = true;
      });

      setLoadingImages(initial);
    }
  }, [products]);

  // ---------------- FETCH BANNER ----------------

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/admin/banner/all`,
          {
            headers: {
              Authorization: getToken(),
            },
          }
        );

        const data = await res.json();

        if (!Array.isArray(data)) return;

        const device = isDesktop ? 'desktop' : 'mobile';

        const banner = data.find(
          (b) =>
            b.device?.toLowerCase() === device &&
            b.type?.toLowerCase() === 'banner'
        );

        if (banner) {
          setBannerUrl(banner.url);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchBanner();
  }, [isDesktop]);

  // ---------------- FILTER PRODUCTS ----------------

  useEffect(() => {
    if (!products || !id) return;

    let filtered = products.filter(
      (product) => product?.category?._id === id // ✅ FILTER BY ID
    );

    // Price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min &&
        product.price <= priceRange.max
    );

    // Sorting
    if (sortOrder === 'lowToHigh') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sortOrder === 'highToLow') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);

  }, [products, id, sortOrder, priceRange]);

  // ---------------- NAVIGATE ----------------

  const toProductDetailsPage = (productId) => {
    navigate(`/details/${productId}`);
  };

  // ---------------- UI ----------------

  return (
    <>

      {/* BACK BUTTON */}
      <i
        onClick={() => window.history.back()}
        style={{ cursor: 'pointer', left: '5%' }}
        className="bi bi-arrow-left fs-3 text-dark position-absolute"
      ></i>


      {/* BANNER */}

      <img
        className="d-block w-100"
        src={
          bannerUrl ||
          (isDesktop
            ? '//naachiyars.in/cdn/shop/files/Site-offer-shipping.png?v=1728371856'
            : 'https://naachiyars.in/cdn/shop/files/Site-offer-shipping-mobile.png?v=1728371856')
        }
        alt="Banner"
        style={{ height: '300px', objectFit: 'cover' }}
      />


      {/* MAIN CONTAINER */}

      <div className="container mx-auto px-0">

        {/* FILTER BAR */}

        <div className="filters-section mb-4">

          <div className="row align-items-center">

            {/* SORT */}

            <div className="col-md-3 col-6 mb-2">
              <select
                className="form-select fw-semibold"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="none">Sort by Price</option>
                <option value="lowToHigh">Low → High</option>
                <option value="highToLow">High → Low</option>
              </select>
            </div>


            {/* PRICE */}

            <div className="col-md-3 col-6 mb-2">

              <label className="form-label fw-semibold">
                ₹{priceRange.min} - ₹{priceRange.max}
              </label>

              <input
                type="range"
                className="form-range"
                min="0"
                max="50000"
                step="1000"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({
                    min: 0,
                    max: Number(e.target.value),
                  })
                }
              />

            </div>

          </div>

        </div>


        {/* LOADER */}

        {loading ? (

          <SkeletonLoader />

        ) : (

          <div className="row justify-content-center">

            {filteredProducts?.length > 0 ? (

              filteredProducts
                .filter((p) => p?.status)
                .map((product) => (

                  <div
                    className="col-lg-3 col-md-4 col-sm-6 col-6 mb-4"
                    key={product._id} // ✅ Proper key
                  >

                    <div
                      className={`card position-relative ${
                        product.quantity <= 0 ? 'fade-card' : ''
                      }`}
                    >

                      {/* STOCK BADGE */}

                      {product.quantity > 0 &&
                        product.quantity < 10 && (
                          <div className="stock-badge bg-warning">
                            {product.quantity} left
                          </div>
                        )}

                      {product.quantity <= 0 && (
                        <div className="stock-badge bg-danger text-white">
                          Out of Stock
                        </div>
                      )}


                      {/* IMAGE */}

                      <div
                        className="image-container position-relative"
                        onClick={() =>
                          toProductDetailsPage(product._id)
                        }
                      >

                        {loadingImages[product._id] && (
                          <div className="image-loader d-flex justify-content-center align-items-center">
                            <div className="spinner-border"></div>
                          </div>
                        )}

                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          className="product-image primary"
                          onLoad={() =>
                            handleImageLoad(product._id)
                          }
                        />

                        <img
                          src={
                            product.images?.[1] ||
                            product.images?.[0]
                          }
                          alt={product.name}
                          className="product-image secondary"
                        />

                      </div>


                      {/* BODY */}

                      <div className="card-body p-0">

                        <h6 className="mx-1 text-capitalize">
                          {product.name}
                        </h6>

                        <div className="mx-1">

                          <span className="fw-semibold">
                            ₹{product.price}
                          </span>

                          <span className="ms-2 text-decoration-line-through small">
                            ₹{(product.price * 1.5).toFixed(0)}
                          </span>

                        </div>

                      </div>

                    </div>

                  </div>

                ))

            ) : (

              <div className="text-center text-muted fs-5 py-5">
                No products found
              </div>

            )}

          </div>

        )}

      </div>

    </>
  );
}

export default ProductListingPage;
