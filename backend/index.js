const router1 = require('./routes/index')
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');




const app = express(); 


const port = 4000;
app.use(cors());
app.use(express.json());

app.use("/api/v1",router1);
mongoose.connect('mongodb://localhost:27017/db');
app.listen(port,()=>{
  console.log(`app is listening on port ${port}`)
})
 

