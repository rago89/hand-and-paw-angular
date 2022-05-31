/* eslint-disable no-underscore-dangle */
const express = require("express");
const path = require("path");

const upload = require("../../middleware/multer-upload-avatar");
const userController = require("../../controllers/users");
const tokenChecker = require("../../middleware/token-login");

const userRoute = express.Router();

userRoute.post("/register", userController.postUser);

userRoute.get("/", userController.getAllUsers);

// disable validation auth
userRoute.get("/:id", userController.getUser);
userRoute.put(
  "/update/:id",
  upload.single("avatar"),
  tokenChecker,
  userController.updateUser
);

userRoute.delete("/delete/:id", userController.deleteUser);
userRoute.patch("/add-favorite/:id", tokenChecker, userController.addFavorite);
userRoute.patch(
  "/remove-favorite/:id",
  tokenChecker,
  userController.removeFavorite
);

module.exports = userRoute;
