import express, { request, response } from "express";
import mongoose from "mongoose";

const foodCategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
  },
  { timestamps: true },
);
export const FoodCategory = mongoose.model("FoodCategory", foodCategorySchema);
