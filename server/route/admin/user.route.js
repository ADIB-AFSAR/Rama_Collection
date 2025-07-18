const express = require('express')
 const upload = require('../../middleware/multer.middleware')
const { getUsers, storeUsers, updateUsers, deleteUsers, forgotPassword, resetPassword } = require('../../controller/admin/user.controller')
const router = express.Router()


router.get('/',getUsers)
router.post('/store',storeUsers),
router.post('/update/:id',updateUsers)
router.delete('/delete/:id',deleteUsers)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password/:token',resetPassword)

module.exports = router