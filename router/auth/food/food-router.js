import express from "express";
import { createFoodController } from "../../../controller/food/create-food.js";
import { listFoodController } from "../../../controller/food/list-food.js";
import { getFoodController } from "../../../controller/food/get-food.js";
import { updateFoodController } from "../../../controller/food/update-food.js";
import { deleteFoodController } from "../../../controller/food/del-food.js";
import { requireAdmin, requireAuth } from "../../../middleware/auth.js";

const router = express.Router();

router.post("/create", requireAuth, requireAdmin, createFoodController);
router.get("/get", listFoodController);
router.get("/get/:id", getFoodController);
router.put("/update", requireAuth, requireAdmin, updateFoodController);
router.delete("/delete", requireAuth, requireAdmin, deleteFoodController);

export default router;
