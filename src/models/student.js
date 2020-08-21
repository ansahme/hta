const mongoose = require('../db/mongoose');
const validator = require('validator');

const Student = new mongoose.Schema({
    fName:{
        type:String,
        required:true,
        length:20
    },
    lName:{
        type:String,
        required:true,
        length:20,
    },
    dob:{
        type:Date
    },
    grade:{
        type:String,
        required:true
    },
    schoolName:{
        type:String,
        length:100
    },
    parentsIds:{
        type:[]
    },
    coursesEnrolled:{
        type:[]
    },
    scheduleIds:[{type:String}]
});
module.exports = Student;