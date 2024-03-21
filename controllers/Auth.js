const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const User=require("../model/user")
const jwt=require("jsonwebtoken")
require("dotenv").config()


exports.signUp=async (req,res)=>{
    try{
        const {name,email,role,password}=req.body
        // db interaction to find user 
        const alreadyUser= await User.findOne({email})
        if (alreadyUser) {
            return res.status(400).json({
                success:false,
                message:"user is already signed in "
            });

        }
        let hashPassword;
        try{
            
        hashPassword=await bcrypt.hash(password,10)
        }
        catch(error){
            return res.status(400).json({
                success:false,
                message:"erro in hashing password "
            });
        }

        // create entry for new user 

        const user=await User.create({
            name,email,password:hashPassword,role
        })
        return res.status(200).json({
            message:"USER CREATED SUCCESSFULLY"
        })
    }
    catch(error){
            console.log(error.message)
            return res.status(500).json({
                message:"user cant be registered",
                success:false
            })
    }
}

exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        // validation 
        if (!email||!password) {
            return res.status(400).json({
                success:false,
                message:"please fill all the details carefully "
            })
        }
    
    const user=await User.findOne({email})
    if (!user){
        return res.status(401).json({
            sucess:false ,
            message:"user is not registerd"
        })
    }

    const payload={
        email:user.email,
        id:user._id,
        role:user.role
    }
      // verify password and generate jwt token 
      if (await bcrypt.compare(password,user.password)){
            // password in matching 
            let token =jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'2h',
            } )
            user:user.toObject();
            user.token=token
            user.password=undefined
            // password hide kr dia 

            const expirationTime = new Date(Date.now() + 30000); // 5000 milliseconds (5 seconds) from now
            res.cookie('token', token, { httpOnly: true, expires: expirationTime }).status(200).json({
                message: "user logged in successfully",
                token,
                user,
                success: true
            });
            
            // res.status(200).json({
            //     message:"user logged in successfuly ",
            //     token,
            //     user,
            //     success:"true"

            // });
      }

      else {
            return res.status(403).json({
                success:false ,
                message:"password incorrect"
            });
      }

    }

    catch(error){
       console.log(error)
       return res.status(500).json({
        message:"login failed ",
        success:false
       })

    }
}