let mongoose= require('mongoose');

let personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type: String,
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
        required: true
    }
})

// create person model
let Person = mongoose.model('Person',personSchema);
module.exports = Person;