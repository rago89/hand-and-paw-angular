const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });

const RefreshToken = require("../models/refresh-token");
const databaseAccess = require("../data-access/users");

const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

const refreshToken = async (req, res) => {
  try {
    const { refreshToken: requestToken } = req.body;
    if (requestToken.refreshToken == null) {
      return res.status(403).json({ message: "Refresh Token is required!" });
    }
    const refreshToken = await RefreshToken.findOne({
      token: requestToken.refreshToken,
    });
    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    const tokenVerificationError = jwt.verify(
      refreshToken.token,
      process.env.REFRESH_TOKEN_SECRET,
      (error) => {
        if (error) {
          return error.message;
        }
      }
    );

    if (tokenVerificationError) {
      return res.status(403).json({ message: "Refresh token expired!" });
    }

    const userRegistered = await databaseAccess.read(requestToken.id);
    const user = {
      id: userRegistered[0]._id,
      name: userRegistered[0].name,
      phone: userRegistered[0].phone,
      location: userRegistered[0].location,
      website: userRegistered[0].website,
      avatar: userRegistered[0].avatar,
      favorites: userRegistered[0].favorites,
      publicAccess: userRegistered[0].avatar,
      registeredAnimals: userRegistered[0].registeredAnimals,
      publicAccess: userRegistered[0].publicAccess,
    };

    const newAccessToken = jwt.sign({ user }, tokenSecret, {
      expiresIn: "15m",
    });

    return res
      .set({
        "Access-Control-Expose-Headers": "Authorization",
        Authorization: `Bearer ${newAccessToken}`,
      })
      .status(200)
      .json({
        user: user,
        token: newAccessToken,
        refreshToken: refreshToken.token,
        expiresIn: `${new Date().getTime() + 15 * 60 * 1000}`,
        refreshTokenExpiresIn: refreshToken.expiryDate,
      });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = refreshToken;
