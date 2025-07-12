const express = require("express")
const { getUserOrders } = require("../../controller/front/order.controller");
const { authorization } = require('../../middleware/authorization.middleware');

const router = express.Router();
router.use(authorization)

router.post('/user',getUserOrders)


module.exports = router