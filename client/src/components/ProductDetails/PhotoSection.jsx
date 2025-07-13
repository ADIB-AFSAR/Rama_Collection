import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel'; // If you use a carousel library, install with `npm install react-responsive-carousel`
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel default styles
import './productDetails.css' 

const PhotoSection = ({CurrentProductImages}) => { 
  const [mainImage, setMainImage] = useState('');
  const [isZooming, setIsZooming] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true); // Track screen size
 
  
  // Check if the screen is large or small
  const checkScreenSize = () => {
    setIsLargeScreen(window.innerWidth > 768); // If screen width > 768px, it's large
  };

  useEffect(() => { 
    if (CurrentProductImages && CurrentProductImages.length > 0) {
      setMainImage(CurrentProductImages[0]); // Set the main image if available
    }

    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize); // Update on resize
    return () => window.removeEventListener('resize', checkScreenSize); // Cleanup listener
  }, [ CurrentProductImages]);

  const updateMainImage = (src) => {
    setMainImage(src);
  };

  const handleMouseEnter = () => {
    if (isLargeScreen) setIsZooming(true); // Enable zooming only on large screens
  };

  const handleMouseLeave = () => {
    setIsZooming(false); // Stop zooming on hover out
  };

  if (!CurrentProductImages || CurrentProductImages.length === 0) {
    return <p>No images available.</p>; // Handle case where there are no images
  }

  return (
    <div className="row p-0 m-0">
      {/* On large screens, display thumbnail CurrentProductImages */}
      {isLargeScreen && CurrentProductImages && CurrentProductImages.length > 0 && (
        <div className="col-md-2 desktop-view">
          <div className="product-CurrentProductImages">
            {CurrentProductImages.map((image, index) => (
              <img
                className="mb-2"
                height={'100px'}
                key={index}
                src={image}
                alt="Product"
                onClick={() => updateMainImage(image)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Image */}
      <div 
        className={`col-md-5 main-image-container ${isZooming ? 'zoom-background' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="main-image">
          {isLargeScreen && mainImage && (
            <img
              height={'532px'}
              id="mainImage"
              src={mainImage}
              alt="Main Product"
            />
          )}

          {/* Zoomed Image for large screens */}
          {isZooming && isLargeScreen && mainImage && (
            <div className="zoomed-image">
              <img src={mainImage} alt="Zoomed Product" />
            </div>
          )}
        </div>
      </div>

      {/* On small screens, display a carousel */}
      {!isLargeScreen && CurrentProductImages && CurrentProductImages.length > 0 && (
        <div className="col-12">
          <Carousel showArrows={false} swipeable={true} showThumbs={false} showStatus={false} infiniteLoop>
            {CurrentProductImages.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Product ${index}`} />
              </div>
            ))}
          </Carousel>
        </div>
      )}
       <div className='return-info  mx-1 quicksand desktop-only mt-5'>
          <h5 className='fw-normal mt-5 mb-2'>Returns & Exchange Information</h5>
          <p className='m-0 p-0 small text-muted'>1. Hassle-free returns within 7 days; </p>
          <p className='m-0 p-0 small text-muted'> 2. specific conditions apply based on products and promotions.</p>
          <p className='m-0 p-0 small text-muted'>3. Prepaid order refunds are processed to the original payment method; COD orders receive a coupon code refund.</p>
          <p className='m-0 p-0 small text-muted'>4. Issues with defective, incorrect, or damaged products must be reported within 24 hours of delivery.</p>
          <p className='m-0 p-0 small text-muted'>5. Items purchased during special sales with free product offers, like BOGO, are ineligible for returns.</p>
          <p className='m-0 p-0 small text-muted'>6. A reverse shipment fee of Rs 100 is charged, which will be deducted from the refund.</p>
          <p className='m-0 p-0 small text-muted'>7. For hygiene, items such as accessories, sunglasses, perfumes, masks, and innerwear are non-returnable.</p>
        </div>
    </div>
  );
};

export default PhotoSection;
