import express from "express";

import {
  loginController,
  meController,
  signUpController,
} from "../../controller/auth/auth.js";
import { requireAuth } from "../../middleware/auth.js";

export const router = express.Router();

router.post("/login", loginController);

router.post("/sign-up", signUpController);
router.get("/me", requireAuth, meController);

export default router;
