import { User } from "../../schemas/user-schema.js";
import bcrypt from "bcrypt";

const SALT_ROUND = 10

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
    const safeUser = { id: user._id, email: user.email, role: user.role };
    response.status(200).json({ message: "Login successful", user: safeUser });
  } catch (err) {
    response.status(500).json({ message: "Internal server error", error: err });
  }
};

export const signUpController = async (request, response) => {
  try {
    const { email, password } = request.body;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
    const user = await User.create({ email, password: hashedPassword });

    response.status(201).json({ message: "User created"});
  } catch (err) {
    response.status(500).json({ message: "Internal Server Error", error: err });
  }
};
