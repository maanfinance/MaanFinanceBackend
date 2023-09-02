const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  otp: { type: String, required: true },
  adminDiscount: { type: Number, required: true,default:0 },
});

const OtpModel = mongoose.model("email", OtpSchema);

module.exports = OtpModel;
