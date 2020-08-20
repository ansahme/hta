const mongoose = require('mongoose');
const Course = require('../models/course');
const Parent = require('../models/parent');

const test = async () =>{
    try{
        const courses = await Course.find({});
        
        courses.forEach((c) =>{
          //  { $push: { clubs: ["Manchester United"] } },
         c.studentsEnrolled=( c.studentsEnrolled.concat(['myTestStudent']));
         c.save();
        })
        //console.log(courses);
        //await courses[0].save();
       // await Course.updateMany(courses);
    }catch(e) {
        console.log(e);
    }
};

test();