const mongoose = require('mongoose');
const validator = require('validator');
const express = require('express');
const Course = require('../models/course');
const Parent = require('../models/parent');

const router = new express.Router();

router.post('/courses/add', async (req,res) =>{
   const courses = req.body;
  // console.log(req.body);
   try{
       const courselist = await Course.insertMany(req.body) 
        res.send(courselist);
   }catch(e) {
       res.status(500).send(e);
   }
});

router.get('/courses', async (req,res) =>{
    try{
        res.send(await Course.find());
    }catch(e){
        res.status(500).send();
    }
});

router.post('/courses/signup/',async (req,res) =>{
    const parentId = req.body.parentId;
    const studentId = req.body.studentId;
    const courseCodes = req.body.courseCodes;

    if(!parentId || !studentId || !courseCodes || courseCodes.length < 1 ){
        return res.status(400).send();
    }
    //remove duplicates
    
    try{
       const codeSet = Array.from(new Set(courseCodes));
       const courses = await Course.find({ code: {$in:codeSet}});
        if(!courses || courses.length < 1){
           return res.status(400).send("No courses matched provided course code(s)");
        }
        const parent = await Parent.findById(parentId);
        if(!parent){
           return res.status(400).send("Invalid parent id");
        }
        const student = parent.students.id(studentId);
        if(!student){
            return res.status(400).send("Invalid student id");
        }
        const alreadyEnrolledList = [];
        courses.forEach((c) =>{
           // console.log(c);
            if(student.coursesEnrolled.includes(c.code) || !c.isActive){
                alreadyEnrolledList.push("Student is already enrolled or Course is not active\
                in "+ c.code + ": "+ c.name);
            }else{
                student.coursesEnrolled.push(c.code);
                c.studentsEnrolled.push(student.id);
                c.save();
               // console.log(c);
               
            }
        });
        if(alreadyEnrolledList.length > 0){
            return res.send(alreadyEnrolledList);
        }
        await parent.save();
        //await Course.updateMany(courses);
       res.send(student);
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
})

router.post('/courses/dropout',async (req,res) =>{
    const parentId = req.body.parentId;
    const studentId = req.body.studentId;
    const courseCodes = req.body.courseCodes;

    if(!parentId || !studentId || !courseCodes || courseCodes.length < 1){
        return res.status(400).send();
    }
    try{
        const parent = await Parent.findById(parentId);
        if(!parent){
           return res.status(400).send("Invalid parent Id");
        }

        const student = parent.students.id(studentId);
        if(!student){
            return res.status(400).send("Invalid student id");
        }

        const codeSet = Array.from(new Set(courseCodes));
        const courses = await Course.find({ code: {$in:codeSet}});
        if(!courses || courses.length < 1){
           return  res.status(400).send("No courses matched provided course code(s)");
        }
        courses.forEach((c) =>{
            if(student.coursesEnrolled.includes(c.code)){
                student.coursesEnrolled.remove(c.code);
                c.studentsEnrolled.remove(student.id);
                c.save();
            }
        });
        await parent.save();
        res.send(student);
    }catch(e){
        res.status(500).send(e);
    }
});

router.patch('/courses/:code', async(req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','durationStart','durationEnd','tutionFee','scheduleId','outlineId','isActive'];
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));
   // console.log(isValidOperation,updates,allowedUpdates);
    if(!isValidOperation){
        return res.status(400).send({"error":"Invalid update"});
    }
   try{
       console.log(req.params.code);
    const course = await Course.findOneAndUpdate({code:req.params.code},req.body,{new: true, runValidators:true});
    if(!course){
        return res.status(404).send();
    }
    res.send(course);
   }catch(e){
       res.status(500).send();
   }

})
module.exports = router;