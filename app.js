const { connectDatabase } = require("./database/database");
const Blog = require("./model/blogModel");
const express = require("express")
const app = express();

//nodejs lai form bata aako data parse gar vaneko ho 
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//Database connection Function
connectDatabase()


//GET API ->/F
app.get("/",(req,res)=>{
    res.json({
        status : 3000,
        message:"success"
    })
})

// CREATE Blog API - 
app.post("/createBlog", async (req,res)=>{
    const title = req.body.title;
    const subTitle = req.body.subTitle;
    const description = req.body.description;

    //alternatives 


    //Insert to database logic goes here
    await Blog.create({
        title : title,
        subTitle : subTitle,
        description : description
    })
    res.json ({
        status : 3000,
        message : "Blog Created Successfully"
    })
})

//Alternative
// res.status(2000).json({
//     message : "Blog created successfully"
// })

app.listen(3000,(req,res)=>{
    console.log("Nodejs has started at port 3000")
})