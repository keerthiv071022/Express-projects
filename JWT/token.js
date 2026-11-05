import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

//secret key
const JWT_SECRET="my-secret-key";
const user={
    id:1,
    username:"admin",
    password:await bcrypt.hash("1234",10)
}

//login
app.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    if(username!==user.username){
        return res.status(401).json({
            message:"Invalid username or password"
        })
    }
    const passwordMatch=await bcrypt.compare(password,user.password)
    if(!passwordMatch){
        return res.status(401).json({
            message:"Invalid username or password"
        })
    }
    const token=jwt.sign({
        id:user.id,
        username:user.username
    },
JWT_SECRET,{
    expiresIn:"1hr"
})
console.log(token);

res.json({
    message:"Login successful",
    token:token
})
})
//authentication middleware
const authenticateToken=(req,res,next)=>{
    //get authorization header

    const authheader=req.headers.authorization;
    if(!authheader){
        return res.status(401).json({
            message:"Access token required"
        })
    }
//extract token
const token=authheader.split(" ")[1];
try{
//verify token
const decoded=jwt.verify(token,JWT_SECRET)
req.user=decoded;
next();
}catch(error){
     return res.status(403).json({
            message:"Invalid or expired token"
        })
}
}
//protected route
app.get("/dashboard",authenticateToken,(req,res)=>{
    res.json({
        message:"Welcome to dashboard",
        user:req.user
    })
})


app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000");
    
})