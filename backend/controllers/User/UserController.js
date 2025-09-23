const UserSchema = require('../models/User/UserModel');

const getAllUsers = async (req, res) => {
    try {
        const users = await UserSchema.find().sort({createdAt: -1});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await UserSchema.findById({_id:id});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }catch (error) {
         res.status(500).json({ message: error.message });
    }
}

const createNewUser = async (req, res) => {
    try {
        const newUser = new UserSchema(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedUser = await UserSchema.findByIdAndDelete({_id:id});
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(deletedUser);
    }catch (error) {
         res.status(500).json({ message: error.message });
    }   
}

const updateUserById = async (req, res) => {
    try {   
        const {id} = req.params;
        const updatedUser = await UserSchema.findByIdAndUpdate(
            {_id:id},
            {...req.body}
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    }catch (error) {
         res.status(500).json({ message: error.message });
    }   
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await UserSchema.findOne({email});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.status(200).json(user);
    }catch (error) {
         res.status(500).json({ message: error.message });
    }
}

const registerUser = async (req, res) => {
    try {
        const newUser = new UserSchema(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    }catch (error) {
         res.status(500).json({ message: error.message });
    }
}




module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    deleteUserById, 
    updateUserById,
    loginUser,
    registerUser
};