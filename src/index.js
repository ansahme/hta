const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const parentRouter = require('./routers/parent-router');
const courseRouter = require('./routers/course-router');
const tutorRouter = require('./routers/tutor-router');
const scheduleRouter = require('./routers/schedule-route');

app.use(express.json());
app.use(parentRouter);
app.use(courseRouter);
app.use(tutorRouter);
app.use(scheduleRouter);



app.listen(port,() =>{
    console.log("Home Tutor API server is up on port "+port);
});