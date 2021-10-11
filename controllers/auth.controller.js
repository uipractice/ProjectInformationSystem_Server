var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User =require("../models/user.model");
const config = require("../config/auth.config");

 exports.login=(req,res)=>{
        User.findOne({userName:req.body.userName})
        .then((user)=>{
            if (!user) {
                res.status(200).send({accessToken: null, message: "Invalid user" });
                return;
              }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
              );
        
              if (!passwordIsValid) {
                return res.status(200).send({
                  accessToken: null,
                  message: "Invalid Password!"
                });
              }
              var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
              });
              res.status(200).send({
                id: user._id,
                userName: user.userName,
                accessToken: token
              });
        })
        .catch((err) => res.status(400).json('Error: ' + err))

    
    }

 


