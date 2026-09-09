import express from "express";
import { createFoodController } from "../../../controller/food/create-food.js";
import { listFoodController } from "../../../controller/food/list-food.js";
import { getFoodController } from "../../../controller/food/get-food.js";
import { updateFoodController } from "../../../controller/food/update-food.js";
import { deleteFoodController } from "../../../controller/food/del-food.js";

const router = express.Router();

router.post("/create", createFoodController);
router.get("/get", listFoodController);
router.get("/get/:id", getFoodController);
router.put("/update", updateFoodController);
router.delete("/delete", deleteFoodController);

export default router;
