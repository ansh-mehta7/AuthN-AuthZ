const express =require("express") 
const router=express.Router()

const {login,signUp}=require("../controllers/Auth")
const {auth,isAdmin,isStudent}= require ("../middlewares/auth")
router.post("/login",login)
router.post("/signup",signUp)

router.get("/test ",auth,(req,res)=>{
       try{
        res.json({
            success:true,
            message:"welcome to the TEST protected routes "
        });
       }catch(error){
        console.log(error.message)
       }
});

router.get("/student ",auth,isStudent,(req,res)=>{
        res.json({
            success:true,
            message:"welcome to the protected route for student "
        });
});

router.get("/admin ",auth,isAdmin,(req,res)=>{
        res.json({
            success:true,
            message:"welcome to the protected route for admin "
        });
});

module.exports=router