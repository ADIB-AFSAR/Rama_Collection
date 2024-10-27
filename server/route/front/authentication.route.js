const express = require('express')
const { register , login } = require('../../controller/front/authentication.controller')
const router = express.Router()

router.post('/register', (req, res, next) => {
    console.log('Request Body:', req.body); // Log the request body here
    next();
}, register);
router.post('/login',(req, res, next) => {
    console.log('Request Body:', req.body); // Log the request body here
    next();
}, login)

module.exports = router