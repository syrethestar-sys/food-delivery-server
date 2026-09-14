import mongoose from "mongoose";
import { Order } from "../../schemas/order-schema.js";
import { Food } from "../../schemas/food.js";

export const createOrderController = async (request, response) => {
  try {
    const userId = request.headers["x-user-id"];
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return response.status(401).json({ message: "Missing or invalid user" });
    }
    const { items, address } = request.body;
    if (!Array.isArray(items) || items.length === 0) {
      return response
        .status(400)
        .json({ message: "Order must include at least one item" });
    }
    if (!address) {
      return response.status(400).json({ message: "Address is required" });
    }
    const orderItems = [];
    let total = 0;

    for (const { foodId, quantity } of items) {
      if (!mongoose.isValidObjectId(foodId) || !quantity || quantity < 1) {
        return response.status(400).json({ message: "Invalid items in order" });
      }
      const food = await Food.findById(foodId);
      if (!food) {
        return response
          .status(404)
          .json({ message: `Food not found: ${foodId}` });
      }

      orderItems.push({ food: food._id, quantity, price: food.price });
      total += food.price * quantity;
    }

    const order = await Order.create({
      user: userId,
      items: orderItems,
      total,
      address,
      status: "Pending",
    });

    response.status(201).json({ message: "Order placed", order });
  } catch (err) {
    response.status(500).json({ message: "Internal server error", error: err });
  }
};