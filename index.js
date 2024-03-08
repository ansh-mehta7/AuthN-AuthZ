const express= require("express")
const app =express()

require('dotenv').config()
const PORT =process.env.PORT || 4000
app.use(express.json())
const dbConnect= require("./config/database")
dbConnect();

// route import 
const user=require("./routes/user")
app.use("/api/v1",user)


// start 
app.listen(PORT,()=>{
    console.log("app is listening at port successfully")
    
})