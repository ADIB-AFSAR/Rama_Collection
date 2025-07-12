const express = require('express')
const router = express.Router()
const authenticationRoute = require('./authentication.route')
const cartRoutes = require('./cart.route')
const order = require('./userOrder.route')
const getReview = require('../../controller/front/review.controller')
const postReview = require('../../controller/front/review.controller')

router.use('/reviews',getReview)
router.use('/', authenticationRoute)
router.use('/cart',cartRoutes)
router.use('/order',order)
router.use('/reviews/:id',postReview)



module.exports = router