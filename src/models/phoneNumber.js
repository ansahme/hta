const mongoose = require('mongoose');
const validator = require('validator');
 
const phoneNumber =new  mongoose.Schema({
   phoneNum:{
       type:String,
       length:10,
       validate(value){
           if(!validator.isMobilePhone(value)){
               throw new error("Please provide a valid phone number");
           }
       }
   },
   phoneNumType:{
       type:String,
       length:30
   },
   timesAvailable:{
       type:String,
       length:40
   }
});

module.exports = phoneNumber;