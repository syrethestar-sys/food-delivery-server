import jwt from "jsonwebtoken";

export const requireAuth = async (request, response, next) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).json({ message: "No header" });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return response.status(401).json({ message: "Token required" });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    request.user = user;
    next();
  } catch (err) {
    response.status(401).json({ message: "Invalid or token expired" });
  }
};

export const requireAdmin = async (request, response, next) => {
  if (request.user?.role !== "admin") {
    return response.status(403).json({ message: "Admin required" });
  }
  next();
};
