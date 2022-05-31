const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/refresh-token");

const logoutController = {
  logout: async (req, res) => {
    try {
      const authHeader = req.headers["authorization"];
      const userId = req.params.id;
      if (!userId) {
        res.status(400).send({ error: "userId empty" });
      }
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        res
          .status(401)
          .json({ message: "validation error, you're not logged!" });
        return;
      }

      const response = await RefreshToken.find({ user: userId }).deleteMany();
      if (response.deletedCount === 0) {
        res.status(401).json({ message: "token is not in the database!" });
        return false;
      }
      return res.status(200).json({ message: "Successfully logged out 😏 🍀" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = logoutController;
