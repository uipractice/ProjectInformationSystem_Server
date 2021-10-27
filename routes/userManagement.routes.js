const router = require('express').Router();
const path = require('path');
const userManagementController = require('../controllers/userManagement.controller')

router.route('/').get(userManagementController.users)

module.exports = router;
