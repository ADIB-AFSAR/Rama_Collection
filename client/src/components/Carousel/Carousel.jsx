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
    "https://www.soch.com/media/wysiwyg/HB_Desktop-min_6.jpg",
    "https://www.soch.com/media/wysiwyg/HB_banner_Desktop-min_2.jpg",
    "https://banarasiweaversshop.com/uploads/images/flash/banarasi_weavers_shop-banner3.jpg",
    "//naachiyars.in/cdn/shop/files/Artboard_3_0c498881-76bd-4f15-9329-6ace3333662b.jpg?v=1725001533"
  ];

  const mobileImages = [
    "https://www.soch.com/media/wysiwyg/HB_Mobile-min_6.jpg",
    "https://www.soch.com/media/wysiwyg/HB_banner_Mobile-min_2.jpg",
    "https://rayethnic.com/cdn/shop/files/indian-summer-mobile-banner_1400x.webp?v=1715415127",
    "//naachiyars.in/cdn/shop/files/mob.jpg?v=1725001533"
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