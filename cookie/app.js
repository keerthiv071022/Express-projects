import express from "express";
import session from "express-session";
const app=express();
//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//serve HTML file
app.use(express.static("public"));

app.use(session({
    secret:"my-secret-key",
    resave:false,
    saveUninitialized:false
}))
//login
app.post("/login",(req,res)=>{
    const {username,password}=req.body;
    console.log("Username:",username);
    console.log("Password:",password);

    if(username==="keerthi"&& password==="1234"){
        //store usernme in session
        req.session.username=username;
        console.log(req.session);
        
        res.redirect("/dashboard");
       
    }else{
        res.send("Invalid username and password")
    }
    
    
});

app.get("/dashboard",(req,res)=>{
    const username=req.session.username;
    console.log("Session:",username);
    if(!username){
        return res.send(`
            <h1>Access Denied</h1>
            <p>Please login first</p>
            <a href="/index.html">Login</a>
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
   req.session.destroy((err)=>{
    if(err){
        return res.send("unable to logout")
    }
    res.redirect("/index.html")
   }
   )
})
app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000");
    
})