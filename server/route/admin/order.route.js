const express = require('express')
 const upload = require('../../middleware/multer.middleware')
 const { getOrder } = require('../../controller/front/order.controller')
const { verifyPayment } = require('../../controller/front/cart.controller')
const router = express.Router()


router.post('/',getOrder)
router.post('/store',upload.single('image'), ),
router.post('/update/:id',upload.single('image'),)
router.delete('/delete/:id', )

router.post('/secure-payment/:id',verifyPayment) 


module.exports = router