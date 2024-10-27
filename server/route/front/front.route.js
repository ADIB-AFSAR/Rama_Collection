const express = require('express')
const router = express.Router()
const authenticationRoute = require('./authentication.route')
const cartRoutes = require('./cart.route')


router.use('/', authenticationRoute)
router.use('/cart',cartRoutes)

module.exports = router