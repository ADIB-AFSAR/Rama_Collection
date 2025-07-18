const express = require('express')
 const upload = require('../../middleware/multer.middleware')
const { getUsers, storeUsers, updateUsers, deleteUsers} = require('../../controller/admin/user.controller')
const router = express.Router()


router.get('/',getUsers)
router.post('/store',storeUsers),
router.post('/update/:id',updateUsers)
router.delete('/delete/:id',deleteUsers)

module.exports = router