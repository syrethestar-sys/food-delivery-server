import express from "express";
import { createOrderController } from "../../controller/order/create-order.js";
import { myOrdersController } from "../../controller/order/my-order.js";
import { listAllOrdersController } from "../../controller/order/all-order-list.js";
import { updateStatusesController } from "../../controller/order/update-status.js";

const router = express.Router();

router.post("/create", createOrderController);
router.get("/my-orders", myOrdersController);
router.get("/all", listAllOrdersController);
router.put("/update-status", updateStatusesController);

export default router;
