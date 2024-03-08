const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const User=require("../model/user")

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