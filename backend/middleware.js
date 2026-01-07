const {JWT_SECRET} = require("./routes/config")
const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next)=>{
  const authHeader = req.headers.authorization;
  console.log(authHeader.split(' ')[1])


  if(!authHeader || !authHeader.startsWith('Bearer')){
    return res.status(403).json({});
  }

  const token = authHeader.split(' ')[1];
  console.log(token);
  
  try{

    const decoded = jwt.verify(token,JWT_SECRET);
    if(decoded.userId){
     req.userId = decoded.userId;
      next();
    }

  }catch(err){
    return res.status(403).json(err)
  }

}

module.exports = {
  authMiddleware
}