const mongoose = require("mongoose");

const PromoSchema = new mongoose.Schema(
  {
    promoCode: { type: String,required: true },
    discount: { type: Number,required: true },
    status: { type: String,required: true, default:"true" },
    orderDate: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const PromoModel = mongoose.model("Promo", PromoSchema);

module.exports = {
    PromoModel,
};
