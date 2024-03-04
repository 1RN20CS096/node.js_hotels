let mongoose = require('mongoose');
let menuItemSchema = mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    price:{
        type: Number,
        required: true,
    },
    taste:{
        type:String,
        enum: ['sweet','sour','bitter'],
        required: true,
    },
    is_drink:{
        type: Boolean,
        default: false,
    },
    ingredients:{
          type: [String],
          default:[],
    }
})
let MenuItem = mongoose.model('MenuItem',menuItemSchema);
module.exports = MenuItem;