import express, { request, response } from "express";
import mongoose from "mongoose";
import { User } from "./schemas/user-schema.js";
import { connectDB } from "./connectDB.js";
import { foodCategory } from "./schemas/food-category.js";

const app = express();

const PORT = 1000;

app.use(express.json());

connectDB();

app.post(`/food/category`, async (request, response) => {
  try {
    const { categoryName } = request.body ?? {};

    if (!categoryName) {
      return response
        .status(400)
        .json({ message: "Category name is required", field: "categoryName" });
    }
    const existing = await foodCategory.findOne({ categoryName });
    if (existing) {
      return response
        .status(409)
        .json({ message: "Category already exists", field: "categoryName" });
    }
    const category = await foodCategory.create({ categoryName });
    response.status(201).json(category);
  } catch (err) {
    console.log(err);
    response.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      response.status(404).json({ message: "not found", user: user });
    }
    response.status(201).json({ message: "user found", user: user });
  } catch (err) {
    response.status(500).json({ message: "Internal server error" });
  }
});
app.listen(PORT, () => {
  console.log(`server is running, on port ${PORT}`);
});
