// ThIS IS A MIDDLEWARE WHICH WORKS WITH THE HELP OF THE JWT-TOKEN AND VERIFIES THE USER'S SAVED TOKEN IN THE COOKIES AND IF VERIFIED IT RETURNS THE SECRET KEY WHICH WE SETTED AS _ID HERE (WE CAN ALSO SET IT AS EMAIL-WISE BCZ IT IS ALSO UNIQUE WE MENTIONED REMEMBER??!!) SO AFTER VERIFYING THE NEXT() MIDDLEWARE IS CALLED WHICH IS AT THE GET REQUEST OF THE /MYBLOGS IN THIS CASE AND FROM THERE THAT ENDPOINT TAKES CARE OF THE FURTHER RENDERING
const jwt=require("jsonwebtoken");
const User=require('../models/users');

const cookieParser = require('cookie-parser');

//we used next keyword to move to the next middleware
const auth=async (req,res,next)=>
{
    try
    {
        console.log("authenticating")
      const token=req.cookies.jwt;
      const verifyUser= jwt.verify(token,process.env.SECRET_KEY);
    
    const userLogged=User.findOne({_id:verifyUser._id})
    req.ok=1;
    req.token=token;
    req.user=verifyUser;
    req.userId=verifyUser._id;
    req.email=verifyUser.email;
     
    next();
 
    }
    catch(error)
    { 
        
        
        req.ok=2;
       next();
    }

}

module.exports=auth;