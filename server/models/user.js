const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:'Please enter name'
    },
    email:{
        type: String,
        required:'Please enter email',
        unique:true
    },
    phone:{
        type: String,
        required:'Please enter phone no.'
    },
    password:{
        type: String,
        required:'Please enter password'
    },
    gender:{
        type: String,
        required:'Please enter gender'
    },
    dob:{
        type: Date,
        required:'Please enter dob'
    },
    religion:{
        type: String,
        required:'Please enter religion'
    },
    caste:{
        type:String,
        required:'Please enter caste'
    },
    address:{
        type:String,
        required:'Please enter address'
    },
    state:{
        type:String,
        required:'Please enter state'
    },
    city:{
        type:String,
        required:'Please enter city'
    }
}, { versionKey : false });

const User = mongoose.model('user',userSchema);

module.exports = User;