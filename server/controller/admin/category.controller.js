const categoryModel = require("../../models/category.model");
const fs = require('fs');
const path = require('path');

const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        return res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

const storeCategories = async (req, res) => {
    try {
        const categoryExist = await categoryModel.findOne({ name: req.body.name });
        if (categoryExist) {
            return res.status(409).json({ message: "Category already exists!" });
        } else {
            await categoryModel.create({
                name: req.body.name,
                status: req.body.status,
                parent: req.body.parent || null,
                image: req.file ? req.file.path.replace('public', "") : null, // Check if req.file exists
            });
            return res.status(201).json({ message: "Category created successfully" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

const updateCategories = async (req, res) => {
    try {
        const categoryExist = await categoryModel.findOne({ _id: req.params.id });
        if (categoryExist) {
            if (req.file) {
                if (categoryExist.image) {
                    const url = path.join(__dirname, '../../public', categoryExist.image);
                    if (fs.existsSync(url)) {
                        fs.unlinkSync(url);
                    }
                }
                await categoryModel.updateOne({ _id: req.params.id }, {
                    name: req.body.name,
                    status: req.body.status,
                    parent: req.body.parent,
                    image: req.file.path.replace('public', ""),
                });
                return res.status(200).json({ message: "Category updated successfully with image" });
            } else {
                await categoryModel.updateOne({ _id: req.params.id }, {
                name: req.body.name,
                status: req.body.status,
                parent: req.body.parent,
            });
            return res.status(200).json({ message: "Category updated successfully without changing image" });
            }
        } else {
            return res.status(404).json({ message: "Category not found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

const deleteCategories = async (req, res) => {
    try {
        const categoryExist = await categoryModel.findOne({ _id: req.params.id });
        if (categoryExist) {
            await categoryModel.deleteOne({ _id: req.params.id });
            return res.status(204).send(); // No content response
        }
        return res.status(404).json({ message: "Category not found" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};



// Build Parent → Child tree
const buildCategoryTree = (categories, parentId = null) => {
  return categories
    .filter(cat =>
      parentId === null
        ? cat.parent === null
        : cat.parent?.toString() === parentId.toString()
    )
    .map(cat => ({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      children: buildCategoryTree(categories, cat._id)
    }));
};

const getCategoryTree = async (req, res) => {
  try {

    const categories = await categoryModel.find({ status: true });

    const tree = buildCategoryTree(categories);
    
    res.json(tree)

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: 'Failed to load categories',
    });
  }
};



module.exports = {
    getCategories,
    storeCategories,
    updateCategories,
    deleteCategories,
    getCategoryTree,
};
