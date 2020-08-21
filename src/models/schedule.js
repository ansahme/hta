const mongoose = require('mongoose');
const validator = require('validator');
//const Student = require('../models/student');
const Tutor = require('../models/tutor');
const Course = require('../models/course');
const Days = require('../models/days');

const Schedule = mongoose.model("Scheudle",{
    studentIds:[String],
    tutorId:{
        type:String
    },
    courseCode:{
        type:String
    },
    days:{
        type:[Days]
    },
    parentAck:{
        type:Boolean
    },
    tutorAck:{ type:Boolean},
    modifiedBy:{
        type:String,
        required:true,
        enum:['ADM','PARENT','TUTOR']
    }
});
module.exports = Schedule;