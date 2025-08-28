const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createNewUser, deleteUserById, updateUserById } = require('../controllers/UserController')  

//getAllUsers   
router.get('/', getAllUsers);

//getUserById
router.get('/:id', getUserById);

//createNewUser
router.post('/', createNewUser);

//deleteUserById
router.delete('/:id', deleteUserById);

//updateUserById
router.patch('/:id', updateUserById);



module.exports = router;