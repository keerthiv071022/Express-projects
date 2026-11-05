import User from "../model/user.js";
import bcrypt from 'bcrypt';
export const Register=async(req,res,next)=>{
    try{

    const {name,email,phone,password}=req.body
        if(!email){
            console.log("Email is required")
        }
        const existingEmail=await User.findOne({email})
        if(existingEmail){
            console.log("user already exist")
    }
const saltRounds=10
const salt=bcrypt.genSaltSync(saltRounds)
const hash=bcrypt.hashSync(password,salt)
const newUser=new User({name,email,password:hash,phone})
const saveUser=await newUser.save()
res.status(200).json({
    status:true,
    message:"success",
    data:saveUser
})
    }   catch(err){ 
    console.log(err);
    
    }

}