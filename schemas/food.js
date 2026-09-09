import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    foodName: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    ingredients: [{ type: String }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodCategory",                  
      required: true,
    },
  },
  { timestamps: true },
);

export const Food = mongoose.model("Food", foodSchema);