/*const jwt = require("jsonwebtoken");
const authenticate = (req, res, next)=>{
try{
const token = req.headers.authorization.split(" ")[1];
const decode = jwt.verify(token, "secretValue");
req.user = decode
next();
}catch(error){
res.json({message: "authentication failed"});
}
}

module.exports = authenticate;

*/

const User = require('../database/models/user-model.js');
const { SECRET } = require('../database/config.js');
const {Strategy, ExtractJwt} = require('passport-jwt');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:SECRET
}


module.exports = (passport)=>{
passport.use(new Strategy(options, async(payload,done)=>{
    await User.findById(payload.user_id).then(async user=>{
        if(user){
            return done(null, user);
        }
    return done(null, false);
    }).catch ((err)=>{
        return done(null, false);
    });
}))
}