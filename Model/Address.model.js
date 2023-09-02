const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    name: { type: String,required: true },
    Mobile: { type: Number,required: true },
    pincode: { type: Number,required: true },
    locality: { type: String },
    address: { type: String,required: true },
    city: { type: String,required: true },
    state: { type: String,required: true },
    landmark: { type: String },
    alternatephone: { type: Number, },
    addresstype:{ type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

const AddressModel = mongoose.model("Address", AddressSchema);

module.exports = {
  AddressModel,
};
