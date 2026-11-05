const express=require("express")
const app=express();

const PORT=4000;
// app.get('/',(req,res)=>{
//     res.send("hello express js")
//     console.log(req.url);

// })
// app.get('/about',(req,res)=>{
    
//     res.send("About page") 
// })
// app.get('/contact',(req,res)=>{
    
//     res.send("Contact page") 
// })

// CRUD operation
// app.post('/addUser',(req,res)=>{
//     res.send("add user")
// })
// app.put('/editUser/:id',(req,res)=>{
//     res.send("edit data success")
// })
// app.delete('/deleteUser/:id',(req,res)=>{
//     res.send("delete success")
// })


//Request methods
// //1.req.params
// app.get('/user/:id',(req,res)=>{
//     res.send(req.params.id)
// })
// //req.query
// app.get('/search',(req,res)=>{
//     res.send(req.query.name)
// })

// //req.body
// app.use(express.json())
// app.post('/user',(req,res)=>{
//     console.log(req.body);
//     res.send("user data received")
// })
// //req.headers
// app.get('/searchs',(req,res)=>{
//     console.log(req.headers);
//     res.json(req.headers)  
// })


//Response methods
//res.send
// app.get('/user',(req,res)=>{
//     res.send("hello express js")
// })
//res.json
// app.get('/userdata',(req,res)=>{
//     res.json({
//         name:"keerthi",
//         age:27
//     })
// })
// //res.status
// app.get('/user',(req,res)=>{
//     res.status(200).send("success")
// })
// //res.sendFile
// const path=require('path')
// app.get('/index', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// //res.redirect
// app.get('/home',(req,res)=>{
//     res.redirect('/about')
// })
// app.get('/about',(req,res)=>{
    
//     res.send("About page") 
// })

// //res.end
// app.get("/",(req,res)=>{
//     res.end("Hello world")
// })

//get method
// app.get('/user',(req,res)=>{
//     res.json([
//         {id:1,name:"keerthi"},
//         {id:2,name:"ashtami"}
//     ])
// })

// //post method
// app.use(express.json())
// app.post('/user',(req,res)=>{
//     const user=req.body;
//     console.log(user);

//     res.status(201).json({
//    message:"user added"
//     })
// })
// //put method
// app.put('/edit/:id',(req,res)=>{
//     const id=req.params.id
//     const updatedData=req.body
//     res.status(200).json({
//         message:"update success",
//         id,
//         updatedData
//     })
// })

// //delete method
// app.delete('/user/:id',(req,res)=>{
//     const id=req.params.id
//     res.status(200).json({
//         message:"deleted",
//         id
//     })
// })

//Router level middleware

// const myMiddleware=(req,res,next)=>{
//     console.log("Middleware executed");
//     next()
    
// }

// app.get('/',myMiddleware,(req,res)=>{
//     setTimeout(()=>{
//         res.send("home page")
//     },2000)
// })



//application level middleware
// app.use((req,res,next)=>{
//     console.log("Application level");
//     next()
    
// })
// app.get('/user',(req,res)=>{
//      res.send("hello")
// })
// app.get('/about',(req,res)=>{
//      res.send("About page")
// })

app.use(express.static('public'))
app.listen(PORT,()=>{
    // console.log(`Server running on port : ${PORT}`);
    console.log("http://localhost:4000");
    
})

