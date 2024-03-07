const express = require("express");
let app = express();
let db= require('./db');
require('dotenv').config();

let Person = require('./models/person');

let bodyParser = require('body-parser');
app.use(bodyParser.json());

let PORT = process.env.PORT || 3000

let passport = require('./auth');
//Middleware Function
let logRequest = (req,res,next) =>{
    console.log(`[${new Date().toLocaleString()}] Request Made To : ${req.originalUrl}`);
    next(); // move on to next phase
}
app.use(logRequest);

app.use(passport.initialize());
let localAuthMiddleware = passport.authenticate('local',{session: false});

app.get('/',(req,res)=>{
    res.send("welcome to our hotel");
});

let menuRoutes = require('./routers/menuroutes');
app.use('/menuitem', menuRoutes);

let personRoutes = require('./routers/personRouters');
app.use('/person', personRoutes);

app.listen(PORT,()=>{
    console.log("server is up ");
});