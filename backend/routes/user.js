const express = require('express');
const mongoose = require('mongoose')
const z = require('zod');
const {User} = require('../databaseFile/db');
const {AccountBalance} = require('../databaseFile/db');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('./config')
const {authMiddleware} = require('../middleware')

const userRouter = express.Router();



 const UserValidation = z.object({
   userName : z.string(),
   firstName : z.string(),
   lastName : z.string(),
   password : z.string(),

 })

 const SignInValidation = z.object({
  userName : z.string(),
  password: z.string()
 })

 const updateBody = z.object({
  userName : z.string().optional(),
  firstName : z.string().optional(),
  lastName : z.string().optional()
 })

userRouter.post("/signup", async(req,res)=>{
  const body = req.body;
  const {success} = UserValidation.safeParse(req.body);

  if(!success){
    return res.json({
      message:"Email already taken/Input email is incorrect"
    })
  }

  const user = await User.findOne({
    userName:req.body.userName,
  })

  if(user){
    return res.json({
      message:"Email already taken/Input email is incorrect"
    })
  }

  const dbUser =  await User.create(body);
  const token = jwt.sign({ 
    userId: dbUser._id
  },JWT_SECRET);

  console.log(token);

  const balance = 1+Math.random()*10000;

  await AccountBalance.create({
    userId:dbUser._id,
    balance:balance
  })

  return res.json({
    message:"user created successfully",
    token:token,
    balance:balance,
    userName:req.body.userName
  })

})

userRouter.get('/signin',async(req,res)=>{

  const body = req.query;
  console.log(body);
  const isSuccess = SignInValidation.safeParse(req.query);
   console.log(isSuccess.success);
  
  if(!isSuccess.success){
    return res.json({
      message:"type email again"
    })
  }

  const user = await User.findOne({
    userName:req.query.userName,
  })
  if(user){

    const token = jwt.sign({ 
    userId: user._id
  },JWT_SECRET);

   const myaccount = await AccountBalance.findOne({userId:user._id})
   console.log(myaccount)

    return res.json({
      userName:user.userName,
      token:token,
      balance:myaccount.balance
    })
  }else return res.json({message:"user not found"})

})


/*userRouter.put('/update',middleware,async(req,res)=>{

    const {success} = updateBody.safeParse(req.body);
    if(!success){
      return res.status(411).json({
        message:"user input is incorrect"
      })
    }
    const dbUserId = req.userId;

    await updateOne(req.body,{
         id:req.userId
    });

    res.json({
      message:"updated successfully"
    })
  })*/

userRouter.get("/bulk",async(req,res)=>{
  const filter = req.query.filter|| "";
  console.log(req.query.filter)

  const users = await User.find({
     $or : [{
      firstName: {
        "$regex":filter
      }
     }
     ,
     {
     lastName: {
        "$regex":filter
      }
    }
    ]
  })

 res.json({
  user : users.map(user=>({
         username:user.userName,
         firstName: user.firstName,
         lasrName:user.lastName,
         _id:user._id
  })
)
 })
})



module.exports = userRouter;