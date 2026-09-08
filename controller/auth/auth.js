import { User } from "../../schemas/user-schema.js";
import bcrypt from "bcrypt";

export const loginController = async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
      return response
        .status(404)
        .json({ message: "No account found with that email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return response.status(401).json({ message: "Incorrect password" });
    }

    response.status(200).json({ message: "Login successful", user });
  } catch (err) {
    response.status(500).json({ message: "Internal server error", error: err });
  }
};

export const signUpController = async (request, response) => {
  try {
    const { email, password } = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    response.status(201).json({ message: "user created", user: user });
  } catch (err) {
    response.status(500).json({ message: "Internal Server Error", error: err });
  }
};
