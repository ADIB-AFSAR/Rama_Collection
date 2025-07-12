const express = require("express")
import { getUserOrders } from "../../controller/front/order.controller";
import { authorization } from "../../middleware/authorization.middleware";

const router = express.Router();
router.use(authorization)

router.post('/user',getUserOrders)


module.exports = router