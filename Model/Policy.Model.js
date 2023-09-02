const mongoose = require("mongoose");

const PolicySchema = new mongoose.Schema({
  // other fields...
 
    
      description: { type: String },
      // other fields...
    
  
});

const PolicyModel = mongoose.model("Policy", PolicySchema);

module.exports = PolicyModel;
