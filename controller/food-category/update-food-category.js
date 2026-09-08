import { FoodCategory } from "../../schemas/food-category.js";

export const updateFoodCategory = async (request, response) => {
  try {
    const { id, name } = request.body;

    const foodCategory = await FoodCategory.findByIdAndUpdate(
      id,
      { categoryName: name },
      { new: true },
    );

    if (!foodCategory) {
      return response.status(404).json({ message: "food category not found" });
    }

    response
      .status(200)
      .json({ message: "food category updated", foodCategory });
  } catch (err) {
    response.status(500).json({ message: "Internal Server Error", error: err });
  }
};
