import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import './carousel.css'; // Import custom CSS

function ImageCarousel() {
  // Use media query to determine screen size
  const isDesktop = useMediaQuery({ query: '(min-width: 786px)' });

  // Define images for the carousels
  const desktopImages = [
    "//www.snitch.co.in/cdn/shop/files/5_WebBanner_1920x1080_2_1400x.jpg?v=1729317311",
    "//www.snitch.co.in/cdn/shop/files/3_WebBanner_1920x1080_4_1400x.jpg?v=1729317311",
    "//www.snitch.co.in/cdn/shop/files/4_WebBanner_1920x1080_2_1400x.jpg?v=1729317311",
    "//www.snitch.co.in/cdn/shop/files/2_WebBanner_1920x1080_5_1400x.jpg?v=1729317311"
  ];

  const mobileImages = [
    "//www.snitch.co.in/cdn/shop/files/5_MobileBanner_1080x1350_1_400x.jpg?v=1729317311",
    "//www.snitch.co.in/cdn/shop/files/3_MobileBanner_1080x1350_3_400x.jpg?v=1729317311",
    "//www.snitch.co.in/cdn/shop/files/2_MobileBanner_1080x1350_4_400x.jpg?v=1729317311",
    "//www.snitch.co.in/cdn/shop/files/4_MobileBanner_1080x1350_2_400x.jpg?v=1729317311"
  ];

  return (
    <Carousel data-bs-ride="carousel" data-bs-interval="3000">
      {(isDesktop ? desktopImages : mobileImages).map((src, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={src} alt={`Image ${index + 1}`} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ImageCarousel;