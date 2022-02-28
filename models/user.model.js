const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userId: {type:String},
    password: {type:String},
    userName:{type:String},
    contactNumber: {type:String},
    practice:{type:String},
    practiceName: {type:String},
    pset: {type:Array},
    status: {type:String},
    role: {type:String},
    createdAt: {type:Date},
    updatedAt: {type:Date},
  },
{ timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
