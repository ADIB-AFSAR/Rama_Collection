const express = require('express')
const router = express.Router()
const categoryRoute = require('./category.route')
const productRoute = require('./product.route')
const userRoute = require('./user.route')
const orderRoute = require('./order.route') 
const visualRoute = require('./visual.route')
const {authorization} = require('../../middleware/authorization.middleware')
 
router.use('/banner', visualRoute); //this route runs without JWT

router.use(authorization)
router.use('/category',categoryRoute)
router.use('/product', productRoute)
router.use('/user', userRoute)
router.use('/order', orderRoute)


module.exports = router