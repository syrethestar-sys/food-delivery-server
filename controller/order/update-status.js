import mongoose, { trusted } from "mongoose";
import { Order } from "../../schemas/order-schema.js";

const VALID_STATUSES = ["Pending", "Delivered", "Cancelled"];

export const updateStatusesController = async (request, response) => {
  try {
    const { id, status } = request.body;

    if (!mongoose.isValidObjectId(id)) {
      return response.status(400).json({ message: "Invalid order id" });
    }
    if (!VALID_STATUSES.includes(status)) {
      return response.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return response.status(404).json({ message: "Order not found" });
    }
    response.status(200).json({ message: "Status updated", order });
  } catch (err) {
    response.status(500).json({ message: "Internal server error", error: err });
  }
};
