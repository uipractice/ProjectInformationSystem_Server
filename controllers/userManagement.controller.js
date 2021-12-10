var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const config = require('../config/auth.config');
const log = console.log;

exports.users = (req, res) => {
  User.find()
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
};
exports.createUser = (req, res) => {
  User.find({ emailId: req.body.emailId })
    .then((user) => {
      if (user.length > 0) {
        return res.send({ message: 'user already exists!' });
      } else {
        const newUser = new User(req.body);
        newUser.save().then((row) => {
          return res.status(200).send({ message: 'user added successfully', status:'success' });
        });
      }
    })
    .catch((err) => {
        return res.status(500).send({ message: 'internal server error' });;
    });
};

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((user)=>{
            return res.status(200).send({ message: 'user deleted successfully' });
        })
      .catch((err) => {
          return res.status(500).send({ message: 'internal server error' });;
      });
  };
  exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id,req.body, {
        upsert: true,
        new: true,
      })
        .then((user)=>{
            return res.status(200).send({ message: 'user updated successfully',status:'success'  });
        })
      .catch((err) => {
          return res.status(500).send({ message: 'internal server error' });;
      });
  };