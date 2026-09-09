import { FoodCategory } from "../../schemas/food-category.js";

export const getFoodCategoryController = async (request, response) => {
  try {
    const foodCategory = await FoodCategory.find();

    response
      .status(200)
      .json({ message: `Food category found`, foodCategory: foodCategory });
  } catch (err) {
    response.status(500).json({ message: "Internal server error", error: err });
  }
};
