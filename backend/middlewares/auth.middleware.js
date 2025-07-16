import jwt from "jsonwebtoken"; 
import { JWT_SECRET } from "../config/env.js";
import Admin from "../models/admin.model.js";

export const authorize = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await Admin.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    req.user = user;
    next(); // Call next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized access", error: error.message });
  }
};
