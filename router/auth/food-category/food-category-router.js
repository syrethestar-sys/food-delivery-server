import express from "express";
import { createFoodCategoryController } from "../../../controller/food-category/create-food-category.js";
import { deleteFoodCategoryController } from "../../../controller/food-category/del-food-category.js";
import { getFoodCategoryController } from "../../../controller/food-category/get-food-category.js";
import { updateFoodCategory } from "../../../controller/food-category/update-food-category.js";

const router = express.Router();

router.post("/create", createFoodCategoryController);
router.delete("/delete", deleteFoodCategoryController);
router.put("/update", updateFoodCategory);
router.get("/get", getFoodCategoryController);

export default router;
