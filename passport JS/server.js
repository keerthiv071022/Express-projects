import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import dotenv from "dotenv";

import passport from "./passport.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));


// Session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);


// Passport
app.use(passport.initialize());
app.use(passport.session());


// Serve HTML files
// app.use(express.static("views"));


// Authentication routes
app.use("/auth", authRoutes);


// Protected dashboard
function isAuthenticated(req,res,next){

    if (req.isAuthenticated()) {

        return next();
        // res.send(`
        //     <h1>Welcome ${req.user.username}</h1>
        //     <p>You are successfully authenticated using Passport.js</p>
        //     <a href="/auth/logout">Logout</a>
        // `);


    } else {

        res.redirect("/login.html");
    }
};

//dashboard
app.get("/dashboard",(req,res)=>{
    res.sendFile(process.cwd()+"/views/dashboard.html")
})
//login
app.get("/login",(req,res)=>{
    res.sendFile(process.cwd()+"/views/login.html")
})
//register
app.get("/register",(req,res)=>{
    res.sendFile(process.cwd()+"/views/register.html")
})

// Start server
app.listen(4000, () => {
    console.log("Server running at http://localhost:4000");
});