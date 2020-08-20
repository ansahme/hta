const express = require('express');
const router = new express.Router();
const Parent = require('../models/parent');
const Course = require('../models/course');

/**Add parent **/
router.post('/parents/',async (req, res) =>{
   const parent = new Parent(req.body);
   try{
    await parent.save();
    res.send(parent);
   }catch(e) {
       res.status(500).send(e);
   }
});

/**Delete Parent **/
router.post('/parents/delete', async (req, res) =>{
    try{
        res.send(await Parent.findByIdAndDelete(req.body.parentId));
    }catch(e) {
        res.status(500).send();
    }
})

//Get Parent
router.post('/parents/getbyEmail',async (req,res) =>
{
    const email = req.body.email
    try{
        const parent = await Parent.findOne({email:email});
      //  console.log(parent);
        if(!parent){
            res.status(404).send();
        }
        res.send(parent);
    }catch(e){
        res.status(500).send();
    }
})
/**Get All Parents */
router.get('/parents', async (req,res) =>{
    try{
        res.send(await Parent.find({}));
    }catch(e){
        res.status(500).send();
    }
})
//add student to parent
router.post('/add/parents/students/',async (req, res) =>{
    const parentId = req.body.parentId;
    if(!parentId || !req.body.students){
        res.status(400).send({"Error":'Invalid input provided1'});
    }
    try{
        const p = await Parent.findById(parentId);
        if(!p){
            res.status(404).send({"Error":'Parent not found!'});
        }
         p.students = p.students.concat(req.body.students);
        await p.save();
        res.send(p);
    }catch(e){
        res.status(500).send(e);
    }
});

//delete student
router.post('/delete/parents/students/',async (req,res) =>{
    try{
        const parentId = req.body.parentId;
        const studentIds = req.body.studentIds;
        const p= await Parent.findById(parentId);
        if(!p || !p.students || !studentIds ){
            return res.status(404).send();
        }
       p.students.every((stdnt) =>{
           if(studentIds.includes(stdnt.id)){
               stdnt.remove();
           }});       

        await p.save();
        res.send(p);
    }catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

//Add Course to Student
router.post('/addcourse/parents/students',async(req,res) =>{
    const parentId = req.body.parentId;
    const studentId = req.body.studentId;
    const courseIds = req.body.courseIds;
    if(!parentId || !studentId || !courseId){
        res.status(400).send();
    }
    const parent = await Parent.findById(parentId);
    if(!parent){
        res.status(404).send();
    }
    const student = parent.students.id(studentId);
    if(!student){
        res.status(400).send({Error:"Student not found"});
    }
    const invalidCourseList =[];
    try{
        courseIds.every( async (courseId) =>{
            const course = await Course.find({ courseId}).exec();
            if(!course){
                invalidCourseList.push(courseId);
            }else{
                student.courses.push(course.id);
            }
        });
        await parent.save();
        if(invalidCourseList.length > 0){
            res.send("The following invalid course Ids were not added:",invalidCourseList);
        }
    }catch(e){
        res.status(500).send();
    }
});

router.patch('/parents',async (req,res) =>{
    const updates = Object.keys(req.body.data);
    const email = req.body.email;
    const allowedUpdates = ['name','relationship','occupation','prefix','active','contacts'];
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));
   // console.log(isValidOperation,updates,allowedUpdates);
    if(!isValidOperation){
        return res.status(400).send({"error":"Invalid update"});
    }
   try{
    const parent = await Parent.findOneAndUpdate({email:email},req.body.data,{new: true, runValidators:true});
    if(!parent){
        return res.status(404).send();
    }
    res.send(parent);

   }catch(e){
       res.status(400).send(e);
   }
})

module.exports = router;