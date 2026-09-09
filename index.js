import express, { request, response } from "express";
import mongoose from "mongoose";
import { User } from "./schemas/user-schema.js";
import { connectDB } from "./connectDB.js";
import { FoodCategory } from "./schemas/food-category.js";
import authRouter from "./router/auth/auth.js";
import foodCategoryRouter from "./router/auth/food-category/food-category-router.js";
import foodRouter from "./router/auth/food/food-router.js";
import cors from "cors";

const app = express();

const PORT = 1000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/auth", authRouter);
app.use("/food-category", foodCategoryRouter);
app.use("/food", foodRouter);

app.listen(PORT, () => {
  console.log(`server is running, on port ${PORT}`);
});
