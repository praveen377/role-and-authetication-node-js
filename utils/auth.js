const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {SECRET} = require("../config");


//desc to register the user(Admin ,Super_admin,User)
const userRegister = async(userDets,role,res) =>{
    try{
        console.log(userDets);
        //validate the user
        let usernameTaken = await validateUsername(userDets.username);
        if(!usernameTaken){
            return res.status(400).json({
                message:"Username is already taken.",
                success:false
            });
        }
        
        //validate the email
        let emailRegistered = await validateEmail(userDets.email);
        if(!emailRegistered){
            return res.status(400).json({
                message:"email is already taken.",
                success:false
            });
        }

        //get the hash password
        const password = await bcrypt.hash(userDets.password,12);

        // create the new user
        const newUser = new User({
            ...userDets,
            password,
            role
        });
        await newUser.save();

        return res.status(201).json({
            message:"user is registered sucessfully,please now login",
            success:true
        });

    } catch(err){
        //implement logger function
        console.log(err);
        return res.status(500).json({
            message:"unable to create account",
            success:false
        });
    }

};

const userLogin = async (userCreads,role,res) =>{
    let {username , password } = userCreads;

    //first check the username in the database
    const user = await User.findOne({username:username});

    if(!user){
        return res.status(404).json({
            message:"Username is not found. Invalid login credentials.",
            sucess:false
        });
    }
    // if user is found then we will check the role
    if(user.role !==  role){
        return res.status(403).json({
            message:"plase make sure that you are logging in from the right portal.",
            sucess:false
        });
    }
    // user is existing and tryig to signin from the right portal
    //now check for the password
    let isMatch = await bcrypt.compare(password,user.password);
    if(isMatch){
        //Sign in the token and issue it to the user
        let token = jwt.sign({
            user_id:user._id,
            role:user.role,
            username:user.username,
            email:user.email
        },SECRET,{expiresIn:"7 days"});

        let result = {
            username:user.username,
            role:user.role,
            email:user.email,
            token:token,
            expiresIn:168
        };
        return res.status(200).json({
            ...result,
            message:"Hurray! You are now logged in.",
            success:true
        });
    }
    else{
        return res.status(403).json({
            message:"incorrect password",
            sucess:false
        });
    }

}


const validateUsername = async username =>{
    let user = await User.findOne({username});
    return user ? false : true;
};

const validateEmail = async email =>{
    let user = await User.findOne({email});
    return user ? false : true;

}

module.exports = {
    userLogin,
    userRegister
};