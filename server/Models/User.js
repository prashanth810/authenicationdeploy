const mongoose = require("mongoose");


const userschema = mongoose.Schema({
    name: {
        type: String,
        requird: true,
    },
    email: {
        type: String,
        requird: true,
        unique: true,
    },
    password: {
        type: String,
        requird: true,
    },
})

const Usermodel = mongoose.model('users', userschema);
module.exports = Usermodel