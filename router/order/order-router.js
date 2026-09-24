import express from "express";
import { createOrderController } from "../../controller/order/create-order.js";
import { myOrdersController } from "../../controller/order/my-order.js";
import { listAllOrdersController } from "../../controller/order/all-order-list.js";
import { updateStatusesController } from "../../controller/order/update-status.js";
import { requireAdmin, requireAuth } from "../../middleware/auth.js";
import { orderLimiter } from "../../middleware/rate-limit.js";

const router = express.Router();

router.post("/create", requireAuth, orderLimiter, createOrderController);
router.get("/my-orders", requireAuth, myOrdersController);
router.get("/all", requireAuth, requireAdmin, listAllOrdersController);
router.put(
  "/update-status",
  requireAuth,
  requireAdmin,
  updateStatusesController,
);

export default router;
