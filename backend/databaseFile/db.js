const mongoose = require("mongoose");



const user = new mongoose.Schema({

  userName:{
    type:String,
    required:true,
  },
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
    },
  password:{
    type:String,
    required:true
  }
})

const accountBalance = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
  balance:{
   type:Number,
   required:true
  }
}) 

const User = mongoose.model('User',user);
const AccountBalance = mongoose.model('AccountBalance',accountBalance)
module.exports = {User,AccountBalance};


