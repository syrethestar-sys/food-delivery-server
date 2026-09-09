import mongoose from "mongoose";
import { Food } from "../../schemas/food.js";

export const deleteFoodController = async (request, response) => {
  try {
    const { id } = request.body ?? {};

    if (!mongoose.isValidObjectId(id)) {
      return response.status(400).json({ message: "Invalid food id" });
    }
    const deletedFood = await Food.findByIdAndDelete(id);
    if (!deletedFood) {
      return response.status(404).json({ message: "Food does not exist" });
    }

    response.status(200).json({ message: "Food deleted", deletedFood });
  } catch (err) {
    response.status(500).json({ message: "Internal server error", error: err });
  }
};
