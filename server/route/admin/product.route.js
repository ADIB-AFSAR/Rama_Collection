const express = require('express')
 const upload = require('../../middleware/multer.middleware')
const { getProducts, storeProducts, updateProducts, deleteProducts } = require('../../controller/admin/product.controller')
const router = express.Router()


// router.get('/',getProducts)
router.post('/store',upload.array('images',10),storeProducts),
router.post('/update/:id',upload.array('images',10),updateProducts)
router.delete('/delete/:id',deleteProducts)

module.exports = router