// path: route/front/review.route.js

const express = require('express');
const router = express.Router();
const { getReview, addreview } = require('../../controller/front/review.controller');
const { authorization } = require('../../middleware/authorization.middleware');

// GET reviews (no auth needed)
router.get('/:productId', getReview);

// POST review (requires auth)
router.post('/', authorization, addreview);

module.exports = router;
