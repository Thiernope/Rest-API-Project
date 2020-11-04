
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: true,
        enum: ["user", "admin", "superadmin"]
    },
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
},{timestamps: true});



const User = mongoose.model("Users", userSchema);

module.exports = User;