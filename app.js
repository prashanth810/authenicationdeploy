require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const Authrouter = require("./Routes/Authrout");
const Productrout = require("./Routes/Productrouter");
const Exprenserouter = require("./Routes/Exprenserouter");
const ensuerauth = require('./Middlewares/Authmiddleware');


const port = process.env.PORT || 8000;
const app = express();
require('./Models/db');

app.use(bodyparser.json());
app.use(cors());
app.use(express.json());
app.use('/auth', Authrouter);
app.use('/products', Productrout);

app.get('/get', (req, resp) => {
    resp.send("Hello Console.log")
})

app.use('/expenses', ensuerauth, Exprenserouter)


app.listen(port, () => {
    console.log(`server to console ${port}`);
})