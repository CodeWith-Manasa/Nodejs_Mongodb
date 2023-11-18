//@des Register a user
//@route POST /api/users/register
//@access public
const asyncHandler=require("express-async-handler");
const User=require("../models/userModel")
const bcrypt= require("bcrypt")
const jwt=require("jsonwebtoken")

const registerUser= asyncHandler(async(req,res)=>{
    const {userName,email,password}=req.body;
    if(!userName || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exist")
    }
    //hash password
    const hashedPassword= await bcrypt.hash(password,10);
    const user=await User.create({
        userName,
        email,
        password:hashedPassword
    });
    if(user){
        res.status(201).json({_id:user.id,email:user.email})
    }
    else{
        res.status(400)
        throw new Error("user data is not valid")
    }
})


const loginUser= asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user=await User.findOne({email});
    const acessToken= jwt.sign({
        user:{
            userName:user.userName,
            email:user.email,
            id:user.id,
        }
    },process.env.ACESS_TOKEN,
    {
        expiresIn:"15m"
    })
    if ((user) && (await bcrypt.compare(password,user.password)))
    {
        res.status(200).json({acessToken})
    }
    else{
        res.status(401)
        throw new Error("email or password is not valid")
    }
})

//private route
const currentUser= asyncHandler(async(req,res)=>{

    res.json(req.user)
})

module.exports={registerUser,loginUser,currentUser};
