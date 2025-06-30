import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { getToken } from '../../redux/service/token.service';

function ImageCarousel() {
  const isDesktop = useMediaQuery({ query: '(min-width: 546px)' });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Hardcoded fallback first image for instant rendering
  const fallbackFirstImage = isDesktop
    ? 'https://www.soch.com/media/wysiwyg/HB_Desktop-min_6.jpg'
    : 'https://www.soch.com/media/wysiwyg/HB_Mobile-min_6.jpg';

  useEffect(() => {
    let isMounted = true;

    const preload = (src) => {
      const img = new Image();
      img.src = src;
    };

    const fetchImages = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/banner/all`, {
          headers: {
            Authorization: getToken(),
          },
        });

        const data = await res.json();
        console.log(data)

        const device = isDesktop ? 'desktop' : 'mobile';
        const filtered = Array.isArray(data)
          ? data.filter(
              (img) =>
                img.device?.toLowerCase() === device &&
                img.type?.toLowerCase() === 'carousel'
            )
          : [];

        if (isMounted) {
          filtered.forEach((img) => preload(img.url));
          console.log(filtered , "filtered")
          setImages(filtered.map((img) => img.url));
          setLoading(false);
        }
      } catch (err) {
        console.error('Banner fetch failed:', err);
        if (isMounted) {
          setImages([]);
          setLoading(false);
        }
      }
    };

    fetchImages();
    return () => {
      isMounted = false;
    };
  }, [isDesktop]);

  const carouselImages = images.length > 0 ? images : [fallbackFirstImage];

  // ✅ Phase 2: Render carousel after images are ready
  return (
    <Carousel interval={3000} pause={false}>
      {carouselImages?.map((src, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={src}
            alt={`Slide ${index + 1}`}
            style={{ objectFit: 'cover', height: '400px' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
