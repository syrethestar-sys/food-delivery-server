import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import Redis from "ioredis";

const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;

const store = (prefix) =>
  redis
    ? new RedisStore({ prefix, sendCommand: (...args) => redis.call(...args) })
    : undefined;

const base = {
  standardHeaders: "draft-7",
  legacyHeaders: false,
  // Redis is capped at 30 connections; if a serverless instance can't reach it,
  // let the request through rather than returning a 500.
  passOnStoreError: true,
};

export const globalLimiter = rateLimit({
  ...base,
  store: store("gl:"),
  windowMs: 15 * 60 * 1000,
  limit: 300,
  skip: (request) => request.path === "/",
  message: { message: "Too many requests, try again later" },
});

export const authLimiter = rateLimit({
  ...base,
  store: store("auth:"),
  windowMs: 15 * 60 * 1000,
  limit: 8,
  skipSuccessfulRequests: true,
  message: { message: "Too many attempts, try again in 15 minutes" },
});

export const orderLimiter = rateLimit({
  ...base,
  store: store("order:"),
  windowMs: 60 * 1000,
  limit: 10,
  keyGenerator: (request) => ipKeyGenerator(request.ip),
  message: { message: "Too many orders, slow down" },
});
