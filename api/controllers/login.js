/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const hashCreator = require("../utils/hash");
const databaseAccess = require("../data-access/users");
const RefreshToken = require("../models/refresh-token");

const loginController = {
  addUserLogin: async (req, res) => {
    try {
      const { email } = req.body;
      // check if email is well formatted

      if (!validator.isEmail(email)) {
        res.status(400).json({ message: "You have to enter a valid email" });
        return;
      }
      // check if user do not enter the password
      const password = hashCreator(req.body.password);
      const hashEmpty = hashCreator("");
      if (password === hashEmpty) {
        res.status(400).json({ message: "password is required" });
        return;
      }
      // check if user do not enter the email
      if (!email) {
        res.status(400).json({ message: "email is required" });
        return;
      }
      // check if user exist
      const userRegistered = await databaseAccess.findUserLog(email);

      if (userRegistered.length === 0) {
        res.status(401).json({ message: "You need to register to login" });
        return;
      }

      if (password !== userRegistered[0].password) {
        res.status(400).json({ message: "Incorrect password" });
        return;
      }

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

      const accessToken = jwt.sign(
        { id: user.id, name: user.name },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );

      const refreshToken = jwt.sign(
        {
          user,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "24h",
        }
      );

      const refreshTokenToDb = new RefreshToken({
        user: user.id,
        token: refreshToken,
        expiryDate: new Date().getTime() + 24 * 60 * 60 * 1000,
      });

      const savedRefreshToken = await refreshTokenToDb.save();
      return res
        .set({
          "Access-Control-Expose-Headers": "Authorization",
          Authorization: `Bearer ${accessToken}`,
        })
        .status(200)
        .json({
          user: user,
          token: accessToken,
          refreshToken,
          expiresIn: `${new Date().getTime() + 15 * 60 * 1000}`,
          refreshTokenExpiresIn: savedRefreshToken.expiryDate,
        });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
};

module.exports = loginController;
