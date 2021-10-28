const router = require('express').Router();
const path = require('path');
const userManagementController = require('../controllers/userManagement.controller')

router.route('/').get(userManagementController.users)
router.route('/addUser').post(userManagementController.createUser)
router.route('/deleteUser/:id').delete(userManagementController.deleteUser)
router.route('/updateUser/:id').put(userManagementController.updateUser)

module.exports = router;
