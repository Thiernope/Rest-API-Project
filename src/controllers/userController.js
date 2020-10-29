const User = require('../database/models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next)=>{
bcrypt.hash(req.body.password, 10, function(err, hashedPass){
if(err){
    res.json({error: err})
}

let user = new User({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email, 
    password: hashedPass
});

user.save()
.then(user =>{
    res.json({message: "User signed successifully"});
})
.catch(err =>{

res.status(400)
.json({message:"Check if all fields are filled please!!!!"});
})
})
}


const login = (req, res, next)=>{
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({$or:[{email: username},{phone: username}]})
    .then(user =>{
        if(user){
        bcrypt.compare(password, user.password, function(err, result){
       if(err){
         res.json({error: err})
       }
       if(result){
      let token = jwt.sign({}, "secretValue", {expiresIn:"1h"});
      res.json({
          message: "Login successifylly",
          token
      })
       }else{
           res
           .status(400)
           .json({
               message: "Incorrect password"
           })
       }
        })
        }else{
            res
            .status(400)
            .json({message: "either your password or email is incorrect"});
        }
    });
}

module.exports = {
    register, login
}
