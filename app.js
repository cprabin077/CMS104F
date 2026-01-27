const app = require("express")();
const mongoose = require("mongoose")

//Connecting to database
mongoose.connect("mongodb+srv://CMS104F_db:CMS104F_db@cluster0.1o3topq.mongodb.net/?appName=Cluster0")
.then(()=>{
    console.log("Database connected successfully")
})


//GET API ->/F
app.get("/",(req,res)=>{
    res.json({
        status : "3000",
        message:"success"
    })
})



app.listen(3000,(req,res)=>{
    console.log("Nodejs has started at port 3000")
})