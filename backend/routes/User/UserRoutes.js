const express = require('express');
const router = express.Router();
const { 
    getAllUsers, 
    getUserById, 
    createNewUser, 
    deleteUserById, 
    updateUserById, 
    loginUser, 
    registerUser } = require('../../controllers/User/UserController');  

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

//loginUser
router.post('/login', loginUser);

//registerUser
router.post('/register', registerUser);


module.exports = router;