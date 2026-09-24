import { User } from "../../schemas/user-schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUND = 10;

export const meController = async (request, response) => {
  try {
    const user = await User.findById(request.user.id);
    if (!user) {
      return response.status(401).json({ message: "User no longer exists" });
    }
    const safeUser = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    response.status(200).json({ message: "User found", user: safeUser });
  } catch (err) {
    response.status(500).json({ message: "Internal server error", error: err });
  }
};
export const loginController = async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
      return response
        .status(401)
        .json({ message: "Incorrect email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return response
        .status(401)
        .json({ message: "Incorrect email or password" });
    }
    const payload = {
      id: user._id,
      role: user.role,
    };
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    const safeUser = {
      id: user._id,
      email: user.email,
      role: user.role,
      token: token,
    };
    response
      .status(200)
      .json({ message: "Login successful", user: safeUser, token: token });
  } catch (err) {
    response.status(500).json({ message: "Internal server error", error: err });
  }
};

export const signUpController = async (request, response) => {
  try {
    const { email, password } = request.body;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
    const user = await User.create({ email, password: hashedPassword });

    response.status(201).json({ message: "User created" });
  } catch (err) {
    response.status(500).json({ message: "Internal Server Error", error: err });
  }
};
