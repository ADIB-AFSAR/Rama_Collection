const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // assuming your product model is named 'Product'
    required: true,
  },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model('Review', reviewSchema);
