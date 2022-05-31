const mongoose = require("mongoose");
const User = require("./user");

const RefreshTokenSchema = new mongoose.Schema({
  token: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  expiryDate: Date,
});

RefreshTokenSchema.statics.verifyExpiration = (token) => {
  const date = new Date(token.expiryDate).getTime() + new Date().getTime();
  return date;
};

module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);
