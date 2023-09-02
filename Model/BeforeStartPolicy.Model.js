const mongoose = require("mongoose");

const BeforeStartPolicySchema = new mongoose.Schema({
  // other fields...
 
    
      description: { type: String },
      // other fields...
    
  
});

const BeforeStartPolicyModel = mongoose.model("BeforeStartPolicySchema", BeforeStartPolicySchema);

module.exports = BeforeStartPolicyModel;
