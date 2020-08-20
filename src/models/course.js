const mongoose = require('mongoose');
const validator = require('validator');

const Course = mongoose.model("Course",{
    code:{
        type:String,
        required:true,
        length:10,
        unique:[true,'Course Code already chosen. Please try a different code.']
    },
    name:{
        type:String,
        required:true,
        length:100,
        unique:[true,'Course name already chosen.']
    },
   durationStart:{
       type:Date
   },
   durationEnd:{
       type: Date
   },
   tutionFee:{
       type:Number
   },
   instructorId:{
       type:String
   },
   scheduleId:{
       type:String
   },
   outlineId:{
       type:String
   },
   studentsEnrolled:[{
       type:String}
   ],
   isActive:{
       type:Boolean,
       default:false
   }
});
module.exports = Course;

//MongooseError: Invalid update pipeline operator:
//studentsEnrolled