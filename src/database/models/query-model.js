const mongoose = require('mongoose');
const querySChema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email: {
       type: String, 
       required: true
    },

   message: {
       type: String,
       required: true
   },

   date:{
       type: Date,
       default: Date.now
   }
});


module.exports = mongoose.model('Queries', querySChema );
