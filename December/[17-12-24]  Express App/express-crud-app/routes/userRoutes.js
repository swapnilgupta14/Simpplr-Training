const express = require('express');
const router = express.Router();
const userController = require('../controlllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/newUser', userController.createUser);
router.put('/:id', userController.updateUser);
router.patch('/:id', userController.partialUpdateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;