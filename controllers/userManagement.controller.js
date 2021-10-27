var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User =require("../models/user.model");
const config = require("../config/auth.config");

 exports.users=(req,res)=>{
        User.find({})
        .then((user)=>{
                return user;
        })
        .catch((err) => res.status(400).json('Error: ' + err))
    }

 


