const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
  userName:{type:String},
  password:{type:String},
  emailId:{type:String},
  role:{type:String},
  team:{type:String},
  contactNumber:{type:Number},
  status:{type:String},
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
