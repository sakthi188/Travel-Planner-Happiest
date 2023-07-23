const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let signupSchema = new Schema(
  {
    name:{type:String},
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    
  },
  {
    collection: "SignUp",
  },
);
module.exports = mongoose.model("SignUpSchema", signupSchema);   

