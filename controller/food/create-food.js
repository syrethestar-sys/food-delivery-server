import mongoose from "mongoose";
import { Food } from "../../schemas/food.js";
import { FoodCategory } from "../../schemas/food-category.js";

export const createFoodController = async (request, response) => {
  try {
    const { name, price, image, ingredients, category } = request.body ?? {};

    if (!mongoose.isValidObjectId(category)) {
      return response.status(400).json({ message: "Invalid category id" });
    }
    const categoryExists = await FoodCategory.findById(category);
    if (!categoryExists) {
      return response.status(400).json({ message: "Category does not exist" });
    }

    const food = await Food.create({
      foodName: name,
      price,
      image,
      ingredients,
      category,
    });
    const populated = await food.populate("category", "categoryName");

    response.status(201).json({ message: "Food created", food: populated });
  } catch (err) {
    response.status(500).json({ message: "Internal server error", error: err });
  }
};