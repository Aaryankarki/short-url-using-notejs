const express=require('express');
const urlRoute=require('./routes/url')
const {}=require("./");
const { connectToMongoDB } = require('./connect');
const app=express();
const port=8001;

//connection 
connectToMongoDB('mongodb://localhost:27017/short-url').then(()=>{
    console.log("Mongodb connected")
})


app.use(express.json())
app.use('/url',urlRoute)

//listening
app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})