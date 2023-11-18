const mongoose=require("mongoose");

 const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:[true,"Please add the user name"],
    },
    email:{
        type:String,
        required:[true,"Please add the email"],
        unique:[true,"Email address already taken"],
    },
    password:{
        type:String,
        required:[true,"Please add password"],
    }

 },
 {
    timeStamp:true,
 })

 module.exports=mongoose.model("User",userSchema)