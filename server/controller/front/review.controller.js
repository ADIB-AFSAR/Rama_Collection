const express = require('express');
const Review = require('../../models/review.model');

// GET (no auth needed)
const getReview = async (req, res) => {
  const { productId } = req.params;
  if (!productId || productId === 'undefined') {
    return res.status(400).json({ message: "Invalid productId" });
  }

  try {
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
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

// Assuming you have middleware to check user role
const deleteReview = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can delete reviews.' });
  }

  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found.' });
    }
    res.status(200).json({ message: 'Review deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};



module.exports={
    getReview,
    addreview,
    deleteReview
}
