const mongoose = require("mongoose");

const AgrrementSchema = new mongoose.Schema({
  // other fields...
 
    
      description: { type: String },
      // other fields...
    
  
});

const AgreementModel = mongoose.model("Agreement", AgrrementSchema);

module.exports = AgreementModel;
