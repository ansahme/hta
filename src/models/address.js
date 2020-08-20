const mongoose = require('../db/mongoose');
const validator = require('validator');

const Address = new mongoose.Schema({
    ownerId:{
        type:String,
        required:true
    },
    effectiveDate:{
        type:Date
    } ,
    addrLn1:{
        type:String,
        required:true,
        length:50,
        trim:true
    },
    addrLn2: {
        type:String,
        length:50,
        trim:true
    },
    city:{
        type:String,
        required:true,
        trim:true
    },
    gpdigitalAddress:{
        type:String,
        lengh:20,
        trim:true
    }
});
module.exports=Address;