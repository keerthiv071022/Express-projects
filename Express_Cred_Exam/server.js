import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app=express();
app.use(express.json());

app.use("/books",bookRoutes);
app.get("/",(req,res)=>{
    res.send("Library management system is running");
})

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connected successfully");
    app.listen(process.env.PORT||3000,()=>{
    console.log(`server running on port ${process.env.PORT||3000}`
    );
})
})
.catch((error)=>{
    console.error("MongoDB connection failed: ",error.message);
})

