let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let Person = require('./models/person');

passport.use(new LocalStrategy(async ( USERNAME, password, done)=>{
    // authentication logic // also known as verification function
   try{
    //console.log('received credentials:', USERNAME,password);
    let user =  await Person.findOne ({username: USERNAME});
    if(!user)
          return done(null,false,{message: 'incorrect username'});
    
    let isPasswordMatch = await user.comparePassword(password);
    if(isPasswordMatch){
        return done(null,true);
    }
    else{
        return done(null,false,{message: 'wrong password'});
    }

   }catch(err){
           return done(err);
   }
}));

module.exports = passport;