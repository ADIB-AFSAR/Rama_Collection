const express = require('express')
const router = express.Router()
const authenticationRoute = require('./authentication.route')
const cartRoutes = require('./cart.route')
const order = require('./userOrder.route')
const reviewRoutes = require('./review.route'); 
const { forgotPassword, resetPassword } = require('../../controller/admin/user.controller')

router.use('/reviews', reviewRoutes)
router.use('/', authenticationRoute)
router.use('/cart',cartRoutes)
router.use('/order',order)
router.post('/user/forgot-password',forgotPassword)
router.post('/user/reset-password/:token',resetPassword)


module.exports = router