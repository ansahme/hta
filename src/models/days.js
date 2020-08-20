const mongoose = require('mongoose');
const validator = require('validator');

const Days = new mongoose.Schema({
    name:{
        type:String,
        enum:['Sunday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    },
    dayNumber:{
        type:Number,
        enum:[1,2,3,4,5,6,7]
    },
    isSelected:{
        type:Boolean
    }
});
module.exports = Days;