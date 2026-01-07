const express = require('express');
const mongoose = require('mongoose')
const {AccountBalance} = require('../databaseFile/db');
const { authMiddleware } = require('../middleware');

const accountRouter = express.Router();

accountRouter.get("/balance",authMiddleware,async(req,res)=>{
  
  const account = await AccountBalance.findOne({
    userId: req.userId
  });

  console.log("api got hit")
  
  res.json({
    balance:account.balance
  })
})

accountRouter.put("/transfer",authMiddleware,async(req,res)=>{

  

  const session = await mongoose.startSession();
  session.startTransaction()

  const toAccountId = req.body.accountId;
  const amount = req.body.balance;
  console.log(toAccountId);
  
  const fromAccount = await AccountBalance.findOne({
    userId: req.userId
  }).session(session)


  if(!fromAccount||fromAccount.balance<amount){
    await session.abortTransaction();
    res.status(400).json({
      message: "insufficinet money"
    })
  }
  
  const toAccount = await AccountBalance.findOne({userId:toAccountId}).session(session)

  if(!toAccount){
    await session.abortTransaction();
    res.status(400).json({message:"invalid account"})
  }

  await AccountBalance.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
  await AccountBalance.updateOne({userId:toAccountId},{$inc:{balance:amount}}).session(session)

  await session.commitTransaction();
  res.json({
    message:"transaction completed"
  })

  
})


module.exports = accountRouter;