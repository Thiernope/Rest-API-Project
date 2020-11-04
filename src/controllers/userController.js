const User = require('../database/models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { raw } = require('body-parser');
const {SECRET} = require('../database/config.js')
const registerUser = async (userDets, role, res)=>{
const passport = require('passport');

        //validate the user
let usernameNotTaken = await validateUsername(userDets.username);
if(!usernameNotTaken){
    return res.status(400).json({
        message: `Username is already taken.`,
        success: false
    })
}
//validate the email
let emailNotRegistered= await validateEmail(userDets.email);

if(!emailNotRegistered){
    return res.status(400).json({
        message: `Email is already taken.`,
        success: false
    })
}
//get the hashed password
const password = await bcrypt.hash(userDets.password, 12);
//create new user
const newUser = new User({
    ...userDets,
    password,
    role
});

await newUser.save()
return res.status(201).json({
    message: `User is created successfully. Login now`,
    success: true
});
    
}


const validateUsername = async username =>{
    let user = await User.findOne({username});
    return user? false: true
/*
    if(user){
        return false;
    }else{
        return true
    }
    */
}

const validateEmail  = async email =>{
    let user = await User.findOne({email});
    return user? false: true
/*
    if(user){
        return false;
    }else{
        return true
    }
    */
}



const loginUser = async(userCredentials, role, res)=>{
  let {username, password, email} = userCredentials;

  //check if the username exist in the database

  const user = await User.findOne({username});
  if(!user){
return res.status(404).json({
    message: `Username is not found. Please register first`,
    success: false
});
  }
//check if the email exist in the database
const userEmail = await User.findOne({email});
if(!userEmail){
return res.status(404).json({
  message: `Email is not found. Please register first`,
  success: false
});
}

//check if the user is using right portal
  if(user.role !== role){
return res.status(403).json({
    message: `Please this portal is not yours`,
    success: false 
})
  }
//checking for the password

let isMatch = await bcrypt.compare(password, user.password);
if(isMatch){
//assign the token
let token = jwt.sign({
    user_id: user._id, 
    role: user.role, 
    username: user.username,
    email: user.email
}, 
    SECRET, 
    {expiresIn: "2 days"});

    let result = {
        username: user.username,
        email: user.email,
        role: user.role,
        token: `Bearer ${token}`,
        expriresIn: 48
    }

return res.status(200).json({
    ...result,
    success:true
})
}else{
    return res.status(403).json({
        message: `Please your password doesn't match`,
        success: false 
    })
}

}


module.exports = {
    registerUser, 
    loginUser
}
