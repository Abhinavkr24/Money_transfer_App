require("dotenv").config(); 

const router1 = require('./routes/index')
const { MongoClient } = require('mongodb');
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');




const app = express(); 


console.log(process.env.PORT)
console.log(require('dotenv').config());
app.use(cors());
app.use(express.json());

app.use("/api/v1",router1);


const uri = "mongodb+srv://24kabhinav:2411abhi@cluster0.upp4yux.mongodb.net/";

mongoose.connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));



app.listen(process.env.PORT,()=>{
  console.log(`app is listening on port ${process.env.PORT}`)
})
 

