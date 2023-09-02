const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    Mobile: { type: Number, required: true },
    pincode: { type: Number, required: true },
    locality: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    landmark: { type: String },
    alternatephone: { type: Number, required: true },
    addresstype: { type: String },
    orderStatus: {
      type: String,
      enum: ["Cancelled", "Confirmed", "Delivered","Pending"],
      default: "Confirmed",
    },
    totalprice: { type: Number, required: true },
    oldmobileModel: { type: String },
    mobileCondition: { type: String },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        actualPrice:{ type: Number, required: true },
        title: { type: String, required: true },
        image: { type: String, required: true },
        singleItemPrice: { type: Number, required: true },
        totalitemPrice: { type: Number, required: true },
        display: { type: String, required: true },
        storage: { type: String, required: true },
        quantity: { type: Number, required: true },
        colour: { type: String, required: true },
        colourID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "colorId",
          required: true,
        },
        actualPrice: { type: Number, required: true },
        status: {
          type: String,
      enum: ["Cancelled", "Confirmed", "Delivered","Pending"],
      default: "Confirmed",
        },
      },
    ],
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
      required: true,
    },
    oldmobilePrice: { type: Number },
    promoCode: { type: String },
    promoDiscount: { type: String },
    discountedTotalprice: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    orderDate: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = {
  OrderModel,
};
