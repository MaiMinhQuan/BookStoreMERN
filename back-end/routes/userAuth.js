import jwt from "jsonwebtoken";
import "dotenv/config";

const authenticateToken = (req, res, next) => {
  if (req.headers["auth"] === undefined) {
    return res.status(401).json({ message: "Auth token required" });
  }

  const token = req.headers["auth"];

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, res) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token expired. Please sign in again" });
    }

    req.user = res;
    next();
  });
};

export default authenticateToken;
