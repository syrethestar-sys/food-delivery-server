import { Order } from "../../schemas/order-schema.js";

export const listAllOrdersController = async (request, response) => {
  try {
    const orders = await Order.find({})
      .populate("user", "email")
      .populate("items.food", "foodName image")
      .sort({ createdAt: -1 })
      .lean();
    response.status(200).json({ message: "Orders found", orders });
  } catch (err) {
    response.status(500).json({ message: "Internal server error", error: err });
  }
};
