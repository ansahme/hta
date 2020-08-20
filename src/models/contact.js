const mongoose = require('mongoose');
const validator = require('validator');
const phoneNum = require('./phoneNumber');
const address = require('./address');

const Contact = new mongoose.Schema({
    addresses:[address],
    phoneNums:[phoneNum]
});

module.exports = Contact;