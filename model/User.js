const mongoose = require("mongoose");

const userSchema=  mongoose.Schema({
  name: {
    type:String,
    require:true,
    unique:true
  },
  age: {
    type:Number,
    require:true
  },
});

const User = mongoose.model("User", userSchema);


module.exports = User;