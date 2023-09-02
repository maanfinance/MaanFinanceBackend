const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userImage: { type: String },
  refName: { type: String, required: true },
  refId: { type: String },
  refPhone: { type: Number, required: true },
  refAlternateNumber: { type: Number },
  refOtherNumber: { type: Number },
  refPermanentAddress: { type: String, required: true },
  refCurrentAddress: { type: String, required: true },
  refShopAddress: { type: String, required: true },
  customerName: { type: String, required: true },
  customerId: { type: String },
  customerPhone: { type: Number, required: true },
  customerCardNo: { type: String, required: true },
  customerAlternateNumber: { type: Number },
  customerOtherNumber: { type: Number },
  customerTotalAmount: { type: Number, required: true },
  customerInstallementPerMonth: { type: Number, required: true },
  customerwithInstallmentTotalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  customerTotalDays: { type: Number, required: true },
  customerAmountpaid: { type: Number, required: true, default: 0 },
  customerAmountpendding: { type: Number, required: true },
  customerPermanentAddress: { type: String, required: true },
  customerCurrentAddress: { type: String, required: true },
  customerShopAddress: { type: String, required: true },
  status: { type: String, required: true, default: "true" },
  allInstallments: [
    {
      paid: { type: String, required: true, default: "false" },
      amount: { type: Number, required: true, default: 0 },
      date: { type: String, required: true, default: 0 },
    },
  ],
});

const UserModel = mongoose.model("UserInfo", UserSchema);

module.exports = UserModel;
