const express = require('express')
const { getCategories, storeCategories, updateCategories, deleteCategories } = require('../../controller/admin/category.controller')
const upload = require('../../middleware/multer.middleware')
const router = express.Router()


router.get('/',getCategories)
router.post('/store',upload.single('image'),storeCategories),
router.post('/update/:id',upload.single('image'),updateCategories)
router.delete('/delete/:id',deleteCategories)

module.exports = router