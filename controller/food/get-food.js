import mongoose from "mongoose";
import { Food } from "../../schemas/food.js";

export const getFoodController = async (request, response) => {
  try {
    const { id } = request.params;

    if (!mongoose.isValidObjectId(id)) {
      return response.status(400).json({ message: "Invalid food id" });
    }

    const food = await Food.findById(id).populate("category", "categoryName");

    if (!food) {
      return response.status(404).json({ message: "Food does not exist" });
    }

    response.status(200).json({ message: "Food found", food });
  } catch (err) {
    response.status(500).json({ message: "Internal server error", error: err });
  }
};