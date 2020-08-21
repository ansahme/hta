const express = require('express');
const Parent = require('../models/parent');
const Course = require('../models/course');
const Tutor = require('../models/tutor');
const Schedule = require('../models/schedule');

const router = new express.Router();

router.post('/schedules',async (req,res) =>{
    const parentId = req.body.parentId;
    const studentIds = req.body.studentIds;
    const tutorId = req.body.tutorId;
    const courseCode = req.body.courseCode;
    const days = req.body.days;
    if(!studentIds || studentIds.length < 1 || !tutorId || !courseCode ||
         !days || days.length < 1){
        res.status(400).send("Invalid input");
    }
    try{
        const courses = await Course.find({code:courseCode});
        const tutor = await Tutor.findById(tutorId);
        const parent = await Parent.findById(parentId);
       
        if(!parent || !courses || courses.length < 1 || !tutor){
            return res.status(400).send("Invalid Parent or Course Code or Tutor Id");
        }
        const studentIdmap = parent.students.map((s) => s.id);
        const courseCodeMap = courses.map((c) =>c.code);
        if(!studentIds.every((id) => studentIdmap.includes(id) || !courseCode.every((code) =>
         courseCodeMap.includes(code)))){
            return res.status(404).send("Student Id or Course Code or both are not valid");
        }
        const schedule = await new Schedule(req.body).save();
        tutor.scheduleIds.push(schedule.id);
        await tutor.save();

        parent.students.forEach((s) => {
            if(studentIds.includes(s.id)){
                s.scheduleIds.push(schedule.id);
            }
        });
        await parent.save();

        res.send(schedule);
    }catch(e){
        console.log(e);
        res.status(500).send();
    } 
});

router.patch('/schedules',async (req,res) =>{
    const updates = Object.keys(req.body.data);
    const scheduleId = req.body.scheduleId;
    const allowedUpdates = ['days'];
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));
    if(!isValidOperation){
        return res.status(400).send({"error":"Invalid update"});
    }
   try{
    const schedule = await Schedule.findByIdAndUpdate(scheduleId,req.body.data,{new: true, runValidators:true});
    if(!schedule){
        return res.status(404).send();
    }
    res.send(schedule);

   }catch(e){
       res.status(400).send(e);
   }
})
module.exports = router;