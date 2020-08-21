const mongoose = require('mongoose');
const validator = require('validator');
const Task = require('../models/task');

const Tutor =  mongoose.model("Tutor",{
    name:{
        type:String,
        required:true,
        trim:true,
        length:100
    },
    subjectAreas:[{ type:String}],
    scheduleIds:[{stype:String}],
    grades:[{type:String}],
    tasks:[Task]
})
module.exports = Tutor;