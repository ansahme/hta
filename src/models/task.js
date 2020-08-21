const mongoose = require('mongoose');
const validator = require('validator');

const Task = mongoose.model('Task',{
    name:{
        type:String
    },
    actionRequired:{
        type:String
    },
    description:{
        type:String
    },
    actionURL:{
        type:String,
        trim:true
    }
})