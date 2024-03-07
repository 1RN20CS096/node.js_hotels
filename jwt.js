let jwt = require('jsonwebtoken');
let jwtAuthMiddleware = (req,res,next)=>{
    
    //first check request header has authorization or not
    let authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error:'invalid token'});

    // extract jwt token from request header
    let token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'unauthorized'});
    try{
        //verify token
        let decoded = jwt.verify(token, process.env.JWT_SECRET);

        //attach our information to request object
        req.jwtPayload = decoded;
        next();

    }catch(err){
          console.error(err);
          res.status(401).json({error: 'invalid token'});
    }
}

//function to generate token

let generateToken = (userData) =>{
    return jwt.sign(userData,process.env.JWT_SECRET);
}

module.exports = {jwtAuthMiddleware, generateToken};