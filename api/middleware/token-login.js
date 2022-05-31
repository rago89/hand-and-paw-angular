const jwt = require("jsonwebtoken");
require("dotenv").config();
/**
 *
 * Checks the token created while user login.
 *
 * @returns Rejection error if token no valid.
 */

const tokenChecker = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res
      .status(401)
      .json({ message: "validation error, make sure you are registered!" });
    return;
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      res.status(403).json(error.message);
      return;
    }
    req.user = user;
    next();
  });
};

module.exports = tokenChecker;
