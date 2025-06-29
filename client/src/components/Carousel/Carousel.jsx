import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

function ImageCarousel() {
  const isDesktop = useMediaQuery({ query: '(min-width: 786px)' });
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch(`/api/carousel/carousel/${isDesktop ? 'desktop' : 'mobile'}`);
      const data = await res.json();
      setImages(data.map((img) => img.url));
    };
    fetchImages();
  }, [isDesktop]);

  return (
    <Carousel data-bs-ride="carousel" data-bs-interval="3000">
      {images.map((src, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={src} alt={`Image ${index + 1}`} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ImageCarousel;