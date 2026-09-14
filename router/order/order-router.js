import express from "express";
import { createOrderController } from "../../controller/order/create-order.js";
import { myOrdersController } from "../../controller/order/my-order.js";

const router = express.Router();

router.post("/create", createOrderController);
router.get("/my-orders", myOrdersController);

export default router;
