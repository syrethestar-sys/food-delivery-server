import rateLimit, { ipKeyGenerator } from "express-rate-limit";

const base = {
  standardHeaders: "draft-7",
  legacyHeaders: false,
};

export const globalLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  limit: 300,
  skip: (request) => request.path === "/",
  message: { message: "Too many requests, try again later" },
});

export const authLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  limit: 8,
  skipSuccessfulRequests: true,
  message: { message: "Too many attempts, try again in 15 minutes" },
});

export const orderLimiter = rateLimit({
  ...base,
  windowMs: 60 * 1000,
  limit: 10,
  keyGenerator: (request) => request.user?.id ?? ipKeyGenerator(request.ip),
  message: { message: "Too many orders, slow down" },
});
