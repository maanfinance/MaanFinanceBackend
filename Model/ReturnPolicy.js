const mongoose = require("mongoose");

const ReturnPolicySchema = new mongoose.Schema({
  // other fields...
 
    
      description: { type: String },
      // other fields...
    
  
});

const ReturnPolicyModel = mongoose.model("ReturnPolicySchema", ReturnPolicySchema);

module.exports = ReturnPolicyModel;
