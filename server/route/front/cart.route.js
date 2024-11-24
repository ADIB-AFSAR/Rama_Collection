const express = require('express');
const { getCart, deleteCart, updateCart, addCart, placeOrder, stripePay } = require('../../controller/front/cart.controller');
const { authorization } = require('../../middleware/authorization.middleware');
const upload = require('../../middleware/multer.middleware')


const router = express.Router();
router.use(authorization)


router.post('/',getCart)
router.post('/add/:id',addCart)
router.post('/update/:id',updateCart)
router.delete('/delete/:id',deleteCart) 
router.post('/place-order/:cartId',placeOrder)

router.post('/stripe-pay',upload.single('image'), stripePay) 


module.exports = router