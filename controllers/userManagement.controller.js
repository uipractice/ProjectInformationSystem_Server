var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User =require("../models/user.model");
const config = require("../config/auth.config");

 exports.users=(req,res)=>{
        User.find()
        .then((user)=>{
            console.log("user",user)
                return res.json(user);
        })
        .catch((err) => res.status(400).json('Error: ' + err))
    }

 


