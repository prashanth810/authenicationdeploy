const mongoose = require("mongoose");

const mongo_url = process.env.mongo_url;

mongoose.connect(mongo_url)
    .then(() => {
        console.log('mongo connected console');
    }).catch((err) => {
        console.log(err.message);
    });