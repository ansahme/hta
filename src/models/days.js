const mongoose = require('mongoose');
const validator = require('validator');

const Days = new mongoose.Schema({
    day:{
        type:String,
        enum:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    },
    dayNumber:{
        type:Number,
        enum:[1,2,3,4,5,6,7]
    },
    startTime:{
        type:String,
        required:true
    },
	durationInHours:{
        type:Number,
        required:true
    }
});
module.exports = Days;