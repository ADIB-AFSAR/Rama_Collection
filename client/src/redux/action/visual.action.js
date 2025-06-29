import { FETCH_CAROUSEL_IMAGES, UPLOAD_CAROUSEL_IMAGE } from "../constant/visual.constant";

export const uploadCarouselImage = (payload) => ({
  type: UPLOAD_CAROUSEL_IMAGE,
  payload,
});

export const fetchCarouselImages = (device) => ({
  type: FETCH_CAROUSEL_IMAGES,
  payload: { device },
});