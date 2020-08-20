const express = require('express');
const Parent = require('../models/parent');
const Course = require('../models/course');
const Tutor = require('../models/tutor');

const router = new express.Router();

router.post('/schedule',(req,res) =>{
    const studentIds = req.body.studentIds;
    const tutorId = req.body.tutorId;
    const courseCode = req.body.courseCode;
    const days = req.body.days;

    
})