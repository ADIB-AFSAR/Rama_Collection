const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  device: { type: String, enum: ['desktop', 'mobile'], required: true },
  type: { type: String, enum: ['carousel', 'banner'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('ImageAsset', imageSchema);
