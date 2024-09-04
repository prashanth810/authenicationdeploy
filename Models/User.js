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

    expenses: [
        {
            text: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            createdat: {
                type: Date,
                default: Date.now,
            },
        }
    ]

})

const Usermodel = mongoose.model('users', userschema);
module.exports = Usermodel