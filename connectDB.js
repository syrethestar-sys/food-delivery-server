import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://syrethestar:Jiso0Yeji5@food-delivery.m3fxmza.mongodb.net/",
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
};
