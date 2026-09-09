import mongoose from "mongoose";
import { Food } from "../../schemas/food.js";
import { FoodCategory } from "../../schemas/food-category.js";

export const updateFoodController = async (request, response) => {
  try {
    const { id, name, price, image, ingredients, category } =
      request.body ?? {};

    if (!mongoose.isValidObjectId(id)) {
      return response.status(400).json({ message: "Invalid food id" });
    }
    
    if (category !== undefined) {
      if (!mongoose.isValidObjectId(category)) {
        return response.status(400).json({ message: "Invalid category id" });
      }
      const categoryExists = await FoodCategory.findById(category);
      if (!categoryExists) {
        return response
          .status(400)
          .json({ message: "Category does not exist" });
      }
    }

    const updates = {};
    if (name !== undefined) updates.foodName = name;
    if (price !== undefined) updates.price = price;
    if (image !== undefined) updates.image = image;
    if (ingredients !== undefined) updates.ingredients = ingredients;
    if (category !== undefined) updates.category = category;

    const food = await Food.findByIdAndUpdate(id, updates, { new: true });

    if (!food) {
      return response.status(404).json({ message: "Food does not exist" });
    }

    response.status(200).json({ message: "Food updated", food });
  } catch (err) {
    response.status(500).json({ message: "Internal server error", error: err });
  }
};
