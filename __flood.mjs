import "dotenv/config";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { connectDB } from "./connectDB.js";
import { User } from "./schemas/user-schema.js";
import { Food } from "./schemas/food.js";

await connectDB();
const user = await User.findOne();
const food = await Food.findOne();
const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
await mongoose.disconnect();

const body = JSON.stringify({ items: [{ foodId: food._id, quantity: 1 }], address: "rate limit test" });
const t0 = Date.now();
const line = [];
for (let i = 1; i <= 30; i++) {
  const r = await fetch("http://localhost:2000/order/create", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body,
  });
  line.push(`${i}:${r.status}@${Date.now() - t0}ms`);
}
console.log("SEQUENTIAL (real order writes):");
console.log(line.join(" "));
console.log("total elapsed:", Date.now() - t0, "ms");
