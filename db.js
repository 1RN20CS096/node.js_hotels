let mongoose = require('mongoose');
// define the mongodb connection
//let mongoURL=process.env.MONGODB_URL_LOCAL;

require('dotenv').config();

let mongoURL = process.env.MONGODB_URL;

// set up connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
let db= mongoose.connection;

db.on('connected',()=>{
    console.log('connected to mongodb server');
})

db.on('error',(err)=>{
    console.log('error');
})

db.on('disconnected',()=>{
    console.log('disconnected');
})
// export the database connection
module.exports= db;
