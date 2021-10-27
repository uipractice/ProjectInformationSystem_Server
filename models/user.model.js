const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
  username:{type:String},
  password:{type:String},
  emailId:{type:String},
  role:{type:String},
  team:{type:String},
  contactNumber:{type:Number},
  status:{type:String},
  dateCreated:{type:Date}
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
