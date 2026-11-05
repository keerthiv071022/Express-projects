import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";//Cross-origin resource sharing



import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app = express();


// Middleware
app.use(express.json());
app.use(cors())

// Serve HTML, CSS and JavaScript
app.use(express.static("public"));


// MongoDB connection
const PORT=process.env.PORT||5000;
console.log("MONGO URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(process.envPORT,()=>{
            console.log("Server running on http://localhost:${process.env.PORT}");
            
        })
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });


// Routes
app.use("/api/books", bookRoutes);


// Start server
// app.listen(5000, () => {
//     console.log("Server running on http://localhost:5000");
// });