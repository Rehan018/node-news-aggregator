const express=require('express');
const UserController =require('../controller/UserController.js');
const authenticateToken=require('../middleware/authenticationMiddleware.js');

const userRotes=express.Router();

userRotes.post('/register',UserController.registerUser);
userRotes.post('/login',UserController.loginUser);

userRotes.use(authenticateToken);
userRotes.put('/preference',UserController.updatePreference);

module.exports=userRotes;