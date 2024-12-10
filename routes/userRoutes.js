const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { authenticate } = require('../middlewares/authMiddleware'); //secure endpoint with if user login

router.get('/', authenticate, userController.getAllUsers);
// router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
