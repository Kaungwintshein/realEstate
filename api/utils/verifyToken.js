import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookie.access_token;
  if (!token) return next(createError(404, "You are not authenticated!"));
};
