const mongoose = require('../db/mongoose');
const validator = require('validator');
const address = require('../models/address');
const contact = require('../models/contact');
const student = require('../models/student');
const Task = require('../models/task');

const Parent =  mongoose.model('Parent',{
    name:{
        type:String,
        required:true,
        trim:true,
    },
    relationship:{
        type:String,
        length:20,
        required:true
    },
    occupation:{
        type:String,
        length:100
    },
    prefix:{
        type:String,
        length:10
    },
    active:Boolean,
    students:[student],
    contacts:{
        type:contact
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not value");
            }
        }
    },
    task:[Task]
});

module.exports=Parent;