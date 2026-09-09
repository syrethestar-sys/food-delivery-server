import { FoodCategory } from "../../schemas/food-category.js";

export const createFoodCategoryController = async (request, response) => {
  try {
    const { name } = request.body ?? {};

    if (!name) {
      return response
        .status(400)
        .json({ message: "Category name is required" });
    }
    const exists = await FoodCategory.findOne({ categoryName: name });
    if (exists) {
      return response
        .status(409)
        .json({ message: "That category already exists" });
    }
    const foodCategory = await FoodCategory.create({ categoryName: name });
    response
      .status(201)
      .json({ message: "Food category created", foodCategory });
  } catch (err) {
    response.status(500).json({ message: "Internal server error", error: err });
  }
};
