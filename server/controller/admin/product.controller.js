const fs = require('fs');
const path = require('path');
const productModel = require("../../models/product.model");

const getProducts = async (req, res) => {
    try {
        const products = await productModel.find().populate("category");
        return res.status(200).json(products);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

const storeProducts = async (req, res) => {
  console.log("store:", req.body)
  try {
    const storeData = {
      name: req.body.name,
      slug: req.body.slug || '',
      price: req.body.price || 0,
      description: req.body.description || '',
      category: req.body.category || null,
      status: req.body.status || 'false',
      quantity: req.body.quantity || 0,
      enableSize: req.body.enableSize === 'true' || false,
      sizes: req.body.sizes
        ? Array.isArray(req.body.sizes)
          ? req.body.sizes
          : [req.body.sizes] // in case it's a single checkbox
        : []
    };

    if (req.files && req.files.length > 0) {
      storeData.images = req.files.map(file => file.path.replace('public', ''));
    }

    await productModel.create(storeData);
    return res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error creating product", error: error.message });
  }
};


const updateProducts = async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Request Files:', req.files);
  try {
    const updatedData = {
      name: req.body.name,
      slug: req.body.slug || '',
      price: req.body.price || 0,
      description: req.body.description || '',
      category: req.body.category || null,
      status: req.body.status || 'false',
      quantity: req.body.quantity || 0,
      enableSize: req.body.enableSize === 'true' || false,
      sizes: req.body.sizes
        ? Array.isArray(req.body.sizes)
          ? req.body.sizes
          : [req.body.sizes]
        : []
    };

    if (req.files && req.files.length > 0) {
      updatedData.images = req.files.map(file => file.path.replace('public', ''));
    }

    await productModel.updateOne({ _id: req.params.id }, updatedData);

    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating product", error: error.message });
  }
};


const deleteProducts = async (req, res) => {
    console.log("ToBeDeleted: ",req.params.id)
    try {
        const productExist = await productModel.findOne({ _id: req.params.id });
        if (productExist) {
            await productModel.deleteOne({ _id: req.params.id });
            return res.status(204).send(); // No content response
        }
        return res.status(404).json({ message: "Product not found" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getProducts,
    storeProducts,
    updateProducts,
    deleteProducts
};
