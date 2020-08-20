const mongoose = require('mongoose');
const validator = require('validator');
//const Student = require('../models/student');
const Tutor = require('../models/tutor');
const Course = require('../models/course');
const Days = require('../models/days');

const Schedule = new mongoose.Schema({
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
    startTime:{
        type:String
    },
    durationInHours:{
        type:Number
    }
});