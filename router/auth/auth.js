import express from "express";

import {
  loginController,
  meController,
  signUpController,
} from "../../controller/auth/auth.js";
import { requireAuth } from "../../middleware/auth.js";
import { authLimiter } from "../../middleware/rate-limit.js";

export const router = express.Router();

router.post("/login", authLimiter, loginController);
router.post("/sign-up", authLimiter, signUpController);
router.get("/me", requireAuth, meController);

export default router;
