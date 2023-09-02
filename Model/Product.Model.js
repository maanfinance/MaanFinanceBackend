const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String },
    price: { type: Number },
    subTitle: { type: String },
    brand: { type: String },
    modelName: { type: String },
    networkServiceProvider: { type: String },
    os: { type: String },
    technology: { type: String },
    description: { type: String },
    category: [{ type: String,default:"all" }],
    phoneColour:[{
      color: { type: String },
      img1:{ type: String,required: true },
      img2:{ type: String,required: true  },
      img3:{ type: String ,required: true },
      img4:{ type: String,required: true  },
      ProductPrice:{ type: Number },
      sellingPrice:{ type: Number },
      quantity:{ type: Number,default:1 },
    }
    ],
    model:[
      {display:{ type: String },
      perMonthEmi:{ type: String },
      ModelActualPrice: { type: String } 
    }],
    storage:[
      {phoneStorage:{ type: String },
      perMonthEmi:{ type: String,default:0 },
      ActualPrice: { type: String } 
    }],
    new: { type: String ,default:"false"},
    AppleCareMontly: { type: Number },
    ApplecareMrp:{ type: Number },
    ApplecareDes:[{ type: String }],
    name:{ type: String }
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

const ProductModel = mongoose.model("product", productSchema);

module.exports = {
  ProductModel,
};
