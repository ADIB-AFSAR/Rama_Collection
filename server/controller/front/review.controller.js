const express = require('express');
const Review = require('../../models/review.model');

// GET (no auth needed)
const getReview = async (req, res) => {
  const { productId } = req.params;
  const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
  res.json(reviews);
}

// POST (auth required)
const addreview =  async (req, res) => {
  const { productId, rating, comment } = req.body;
  const review = new Review({
    productId,
    rating,
    comment,
    user: {
      name: req.user.name,
      email: req.user.email,
    }
  });
  await review.save();
  res.status(201).json(review);
}

module.exports={
    getReview,
    addreview
}
