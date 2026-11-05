import express from 'express'
const app=express()
import dotenv from'dotenv'
import connection from './config/db.js'
dotenv.config()
import userRoute from './routes/userRoute.js'

const PORT=process.env.PORT

// const name=process.env.username
console.log(PORT)
// console.log(PORT,name);
connection()

app.use(express.json())
app.use('/user',userRoute)

app.listen(PORT,()=>{
    console.log("http://localhost:4000");
    
})