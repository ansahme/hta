const mongoose = require('mongoose');
const validator = require('validator');
const validator = require('../models/schedule')

const Tutor = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        length:100
    },
    subjectAreas:[{ type:String}],
    scheduleIds:[{stype:String}],
    preferredGrades:[{type:String}]
})