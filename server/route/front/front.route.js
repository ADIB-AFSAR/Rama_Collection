const express = require('express')
const router = express.Router()
const authenticationRoute = require('./authentication.route')
const cartRoutes = require('./cart.route')
const order = require('./userOrder.route')
const reviewRoutes = require('./review.route'); 

router.use('/reviews', reviewRoutes)
router.use('/', authenticationRoute)
router.use('/cart',cartRoutes)
router.use('/order',order)



module.exports = router