import { FoodCategory } from "../../schemas/food-category.js";

export const deleteFoodCategoryController = async (request, response) => {
  try {
    const { id } = request.body ?? {};
    const deletedCategory = await FoodCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      response.status(404).json({ message: `Food category not found` });
    }

    response.status(200).json({ message:"Category deleted", deletedCategory });
  } catch (err) {
    response.status(500).json({ message: "Internal server error", error: err });
  }
};
