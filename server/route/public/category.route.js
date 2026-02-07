const express = require('express');
const router = express.Router();

const {
  getCategoryTree
} = require('../../controller/admin/category.controller');

// Public API
router.get('/tree', getCategoryTree);

module.exports = router;
