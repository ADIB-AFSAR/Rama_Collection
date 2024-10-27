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
    console.log("store:",req.body)
    try {
            const storeData={
                name: req.body.name,
                slug: req.body.slug || '',
                price: req.body.price || 0, // Assuming price is required and defaults to 0
                description: req.body.description || '',
                category: req.body.category ? req.body.category : null, // Set to null if empty
                status: req.body.status || 'false', // Set to false if not a valid boolean
                quantity: req.body.quantity || 0, // Assuming quantity defaults to 0 
        }
        // Check if the file is uploaded before attempting to read the path
        if (req.files && req.files.length > 0) {
            storeData.images = req.files.map(file=> file.path.replace('public', '')) // Save image path without 'public' prefix
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
            price: req.body.price || 0, // Assuming price is required and defaults to 0
            description: req.body.description || '',
            category: req.body.category ? req.body.category : null, // Set to null if empty
            status: req.body.status || 'false', // Set to false if not a valid boolean
            quantity: req.body.quantity || 0 // Assuming quantity defaults to 0
        };

        // Check if the file is uploaded before attempting to read the path
        if (req.files && req.files.length > 0) {
            updatedData.images = req.files.map(file=> file.path.replace('public', '')); // Save image path without 'public' prefix
        }

        // Update the product in the database
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
