const express =require("express") 
const router=express.Router()
const User=require("../model/user")
const {login,signUp}=require("../controllers/Auth")
const {auth,isAdmin,isStudent}= require ("../middlewares/auth")
router.post("/login",login)
router.post("/signup",signUp)
router.get("/test",auth,(req,res)=>{
       res.json({
        success:true,
        message:"welcome to protected route for test"
       })
});

router.get("/authenticated/student",auth,isStudent,(req,res)=>{
        res.json({
            success:true,
            message:"welcome to the protected route for student "
        });
});

router.get("/authenticated/admin",auth,isAdmin,(req,res)=>{
        res.json({
            success:true,
            message:"welcome to the protected route for admin "
        });
});

router.get("/authenticated/getemail",auth,async (req,res)=>{
    try{
        const id =req.user.id;
        console.log(id);
        const user = await User.findById(id);
        res.status(200).json({
            success:true,
            data:user,
            message:"welcome find your details please  "
        });
    }catch(error){
        res.status(400).json({
            message:error.message,
            success:false,
            message:"cant fetch details  "
        });
    }
    
    
})

module.exports=router