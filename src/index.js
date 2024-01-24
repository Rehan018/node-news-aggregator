const express=require('express');
const mongoose=require('mongoose');
const bodyParser = require('body-parser')
const userRotes=require('./routes/userRoutes.js');
const connectUsingMongoose=require('./utils/databse.js');
const newsRouter=require('./routes/newsRoutes.js');

require('dotenv').config();
const app=express();
app.use(bodyParser.json());
const PORT=process.env.PORT || 3200;


app.use(express.json());

app.use('/api/user',userRotes);
app.use('/api',newsRouter);
app.listen(PORT,(err)=>{
    if (err) {
        console.log(`Error in running the server: ${err}`);
      }
      console.log(`Server is running on port: ${PORT}`);
      connectUsingMongoose();
})