// authentication 
// authorisataton 
require("dotenv").config()
const jwt =require('jsonwebtoken')
// next is used to call for the next middleware in the ordering 
// as sepecifod in the routes

exports.auth=(req,res,next)=>{
    try{
            console.log("cookie",req.cookies.token)
            console.log("body",req.body.token)
            console.log("headers",req.header("Authorization"))
            // extract jwt token 
            const token=req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer","");
            
            if (!token){
                return res.status(400).json({
                    success:false,
                    message:"token is missing"
                })
            }
        
        // verify the token 
        try{

            const decode =jwt.verify(token,process.env.JWT_SECRET)
           
            req.user=decode;
            console.log(decode)
            // req user ke andar payload ko store kr lia 

        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"token verification failed "
            })

        }
        next();
        }catch(error){
            return res.status(401).json({
                success:false,
                message:"someting went wrong during verifying the token"
            });
        }    
    }


    exports.isStudent= (req,res,next)=>{
        try{
            console.log(req.user.role)
            if (req.user.role!=="Student"){
                return res.status(401).josn({
                    success:false ,
                    message:"this is a protected route for student"
                })
            }
            next();
        }catch(error){
            return res.status(500).json({
                success:false,
                message:"student role is not macthing"
            });
        }
    }

    

    exports.isAdmin= (req,res,next)=>{
        try{
            console.log(req.user.role)

            if (req.user.role!=="Admin"){
                return res.status(401).json({
                    success:false ,
                    message:"this is a protected route for admin"
                })
            }
            next();
        }catch(error){
            return res.status(500).json({
                success:false,
                message:"Admin  role is not macthing"
            });
        }
    }

