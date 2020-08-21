const express = require('express');
const router = new express.Router();
const Tutor = require('../models/tutor');

router.post('/tutors/',async (req, res) =>{
    const tutor = new Tutor(req.body);
    try{
     await tutor.save();
     res.send(tutor);
    }catch(e) {
        res.status(500).send(e);
    }
 });

 router.get('/tutors', async (req,res) =>{
     try{
        res.send(await Tutor.find({}));
     }catch(e){
         res.status(500).send();
     }
 })
 module.exports = router;