import "dotenv/config";
import express from "express";
import { connectDB } from "./connectDB.js";
import authRouter from "./router/auth/auth.js";
import foodCategoryRouter from "./router/auth/food-category/food-category-router.js";
import foodRouter from "./router/auth/food/food-router.js";
import orderRouter from "./router/order/order-router.js";
import { globalLimiter } from "./middleware/rate-limit.js";
import cors from "cors";

const app = express();
const PORT = 2000;

app.set("trust proxy", 1);

app.use(cors());
app.use(globalLimiter);
app.use(express.json());

app.use(async (request, response, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.log(err);
    response.status(500).json({ message: "Database connection failed" });
  }
});

app.get("/", (request, response) => {
  response.json({ status: "ok" });
});

app.use("/auth", authRouter);
app.use("/food-category", foodCategoryRouter);
app.use("/food", foodRouter);
app.use("/order", orderRouter);

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`server is running, on port ${PORT}`);
  });
}

export default app;
