import mongoose from "mongoose";
import { Food } from "../../schemas/food.js";

export const listFoodController = async (request, response) => {
  try {
    const { category } = request.query;

    if (category && !mongoose.isValidObjectId(category)) {
      return response.status(400).json({ message: "Invalid category id" });
    }

    const filter = category ? { category } : {};

    const foods = await Food.find(filter).populate("category", "categoryName");

    response.status(200).json({ message: "Foods found", foods });
  } catch (err) {
    response.status(500).json({ message: "Internal server error", error: err });
  }
};