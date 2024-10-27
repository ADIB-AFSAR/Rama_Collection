const express = require('express')
 const upload = require('../../middleware/multer.middleware')
 const { getOrder } = require('../../controller/front/order.controller')
const router = express.Router()


router.post('/',getOrder)
router.post('/store',upload.single('image'), ),
router.post('/update/:id',upload.single('image'),)
router.delete('/delete/:id', )

module.exports = router