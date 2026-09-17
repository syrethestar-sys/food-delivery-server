import express from "express";
import { createFoodCategoryController } from "../../../controller/food-category/create-food-category.js";
import { deleteFoodCategoryController } from "../../../controller/food-category/del-food-category.js";
import { getFoodCategoryController } from "../../../controller/food-category/get-food-category.js";
import { updateFoodCategory } from "../../../controller/food-category/update-food-category.js";
import { requireAdmin, requireAuth } from "../../../middleware/auth.js";

const router = express.Router();

router.post("/create", requireAuth, requireAdmin, createFoodCategoryController);
router.delete(
  "/delete",
  requireAuth,
  requireAdmin,
  deleteFoodCategoryController,
);
router.put("/update", requireAuth, requireAdmin, updateFoodCategory);
router.get("/get", getFoodCategoryController);

export default router;
