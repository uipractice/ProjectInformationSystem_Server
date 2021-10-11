const router = require('express').Router();
const path = require('path');
const User = require('../models/user.model');
const controller = require('../controllers/auth.controller')

router.route('/login').post(controller.login)

module.exports = router;
