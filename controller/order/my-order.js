import mongoose from "mongoose";
import { Order } from "../../schemas/order-schema.js";

export const myOrdersController = async (request, response) => {
  try {
    const userId = request.headers["x-user-id"];
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return response.status(401).json({ message: "Missing or invalid user" });
    }
    const orders = await Order.find({ user: userId })
      .populate("items.food", "foodName image")
      .sort({ createdAt: -1 });
    response.status(200).json({ message: "Orders found", orders });
  } catch (err) {
    response.status(500).json({ message: "Internal server error", error: err });
  }
};