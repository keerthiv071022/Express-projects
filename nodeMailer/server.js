import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";

const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(express.static("public"))

//create transporter
const transporter=nodemailer.createTransport({

    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})

//test email configuration
transporter.verify((error,success)=>{
    if(error)
{
    console.log("Email configuration error");
    console.log(error);
}else{
    console.log("Email server is ready");
    
}


});

//send email
app.post("/send-email",async(req,res)=>{
    try{
        const{name,email,message}=req.body;
        //validate input
        if(!name||!email||!message){
            return res.send("All fields are required")
        }
        const mailOptions={
            from:process.env.EMAIL_USER,
            to:"keerthiv071022@gmail.com",
            subject:"New Contact from message",
            text:`
            name:${name}
            Email:${email}
            Message:${message}
            
            
            `
        }
        const info=await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.message);
        res.send("Email sent successfully")
        
    }catch(error)
    {
            console.log(error);
            res.status(500).send("Failed to send email")
    }
})

app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000");
    
})
