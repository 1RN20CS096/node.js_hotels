const express = require("express");
let app = express();
let db= require('./db');
require('dotenv').config();

let bodyParser = require('body-parser');
app.use(bodyParser.json());

let PORT = process.env.PORT || 3000

app.get("/",(req,res)=>{
    res.send("welcome to our hotel");
});


let menuRoutes = require('./routers/menuroutes');
app.use('/menuitem', menuRoutes);

let personRoutes = require('./routers/personRouters');
app.use('/person', personRoutes);

app.listen(PORT,()=>{
    console.log("server is up ");
});