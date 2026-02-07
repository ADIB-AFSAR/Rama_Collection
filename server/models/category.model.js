const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  slug: {
    type: String,
  },

  image: {
    type: String
  },

  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },

  showInMenu: {
    type: Boolean,
    default: true
  },

  status: {
    type: Boolean,
    default: true
  },

  order: {
    type: Number,
    default: 0
  }

}, { timestamps: true });



const categoryModel = mongoose.model('Category', categorySchema)

module.exports = categoryModel