const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const parentRouter = require('./routers/parent-router');
const courseRouter = require('./routers/course-router');

app.use(express.json());
app.use(parentRouter);
app.use(courseRouter);



app.listen(port,() =>{
    console.log("Home Tutor API server is up on port "+port);
});