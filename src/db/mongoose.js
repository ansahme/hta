const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/home-tutor-api',
{
    useUnifiedTopology:true,
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
});

module.exports = mongoose;