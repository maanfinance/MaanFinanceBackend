const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema(
  { 
    email: { type: String },
    discount:{ type: Number },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

const EmailModel = mongoose.model("Domain", EmailSchema);

module.exports = {
    EmailModel
};
