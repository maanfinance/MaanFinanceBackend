const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    actualPrice: { type: Number, required: true },
    color:{ type: String, required: true },
    storage:{ type: String, required: true },
    display:{ type: String, required: true },
    quantity: { type: Number, default: 1, min: 1 },
    oldmobileModel:{ type: String},
    mobileCondition:{ type: String},
    oldmobilePrice:{ type: Number,},
    appleCare:{type:String},
    appleCareMrp:{ type: Number, default: 0, },
    appleCareMontly:{ type: Number, default: 0, },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    colourID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "colour",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CartModel = mongoose.model("cart", cartSchema);

module.exports = {
  CartModel,
};
