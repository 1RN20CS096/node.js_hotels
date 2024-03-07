let mongoose= require('mongoose');
let bcrypt = require('bcrypt');


let personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type: Number,
    },
    mobile:{
        type: Number,
        required: true
    },
    work:{
        type: String,
        enum : ['chef','worker','manager'],
        required: true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    address:{
        type: String,
    },
    salary:{
        type: Number,
        required: true,
    },
    username:{
        required: true,
        type: String,
    },
    password:{
        required: true,
        type: String
    }
})

personSchema.pre('save', async function(next){
    let persons = this;
    //hash the password only only if it has been modified or new
    if(!persons.isModified('password')) return next();
    try{
       // hash password generate
       let salt = await bcrypt.genSalt(10);

       //hash password
       let hashedPassword= await bcrypt.hash(persons.password, salt);
       persons.password = hashedPassword;
       next();

    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
         // use bcrypt to compare the provided password with the hashed password
         let isMatch = await bcrypt.compare(candidatePassword, this.password);
         return isMatch;
    }catch(err){
        throw err;
    }
}
// create person model
let Person = mongoose.model('Person',personSchema);
module.exports = Person;