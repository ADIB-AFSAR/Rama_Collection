const mongoose = require('mongoose');

const slidingTextSchema = new mongoose.Schema({
  text: { type: String, required: true }
});

module.exports = mongoose.model('SlidingText', slidingTextSchema);
