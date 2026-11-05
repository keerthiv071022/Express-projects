import express from "express";
import cookieParser from "cookie-parser";
const app=express();
//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser());

//serve HTML file
app.use(express.static("public"));

app.post("/login",(req,res)=>{
    const {username,password}=req.body;
    console.log("Username:",username);
    console.log("Password:",password);

    if(username==="Keerthi"&& password==="1234"){
        //create a cookie
        res.cookie("username",username,{
            httpOnly:true,
            maxAge:60*60*1000
        })
        res.send(`
            <h1>Login successful</h1>
            <p>Welcome ${username}</p>
            <a href="/dashboard">Go to Dashboard</a>
            `)
    }else{
         res.send(`
            <h1>Login Unsuccessful</h1>
            <p>Invalid username and password</p>
            <a href="/">Try again</a>
            `)
    }
    
    
});

app.get("/dashboard",(req,res)=>{
    const username=req.cookies.username;
    console.log("Cookie:",username);
    if(!username){
        return res.send(`
            <h1>Access Denied</h1>
            <p>Please login first</p>
            <a href="/">Login</a>
            `)
    }
    res.send(`
            <h1>Dashboard</h1>
            <h2>Welcome ${username}</h2>
            <p>You are logged in</p>
            <a href="/logout">Logot</a>
            `)
})
app.get("/logout",(req,res)=>{
    res.clearCookie("username")
    res.send(`
            <h1>Logout successful</h1>
            <p>Your cookie has been deleted</p>
            <a href="/">Log in again</a>
            `)

})
app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000");
    
})