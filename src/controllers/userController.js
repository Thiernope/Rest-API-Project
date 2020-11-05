const User = require('../database/models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { raw } = require('body-parser');
const {SECRET} = require('../database/config.js')
const passport = require('passport')

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
}
const validateEmail  = async email =>{
    let user = await User.findOne({email});
    return user? false: true
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

//passport middleware

const userAuth = passport.authenticate('jwt', {session: false});

//check role middleware

const roleCheck = roles =>(req, res, next)=>{
    if(roles.includes(req.user.role)){
        next();
    }
  return res.status (401).json({
      message: "Unauthorized",
      success: false
  })
}


const serializeUser = user => {
    return {
        username: user.username,
        email: user.email,
        _id: user._id,
        name: user.name,
        phone: user.phone,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt
    }
}

//updating a blog elements of a chose blog by its id

const updateUser = async(req, res)=>{
    try{
const findUser = await User.findById(req.user._id);
const updatedUser = await User.updateOne(
    {_id:findUser._id},
    {$set:{
        name:req.body.name,
        username: req.body.username,
        email:req.body.email,
        phone: req.body.phone 
    }});
    const foundUser = await User.findById(req.user._id).select("name email username phone");
    res
    .status(200)
    .json({message: "The blog is updated",foundUser})
    }catch(err){
        console.log(err);
    res
    .status(404)
    .json({message: "the blog is not updated"});
    }
};





module.exports = {
    userAuth,
    registerUser, 
    loginUser,
    serializeUser,
    roleCheck,
    updateUser
}
