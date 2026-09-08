import express from "express";

import { loginController, signUpController } from "../../controller/auth/auth.js";

export const router = express.Router();

router.post("/login", loginController);

router.post("/sign-up", signUpController);

export default router