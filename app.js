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
app.post("/blogs", async (req,res)=>{
    const title = req.body.title;
    const subTitle = req.body.subTitle;
    const description = req.body.description;

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

// READ Blog API -> All Blogs
app.get("/blogs",async (req,res)=>{

    //fetching /reading all blogs from Blog Model
    const blogs = await Blog.find() // find le array bhitra data read garxa

    // Check if blogs contains data or not
    if(blogs.length == 0){
        res.json({
            status: 404,
            message : "empty blogs"
        })
    }else{
        res.json({
            status: 300,
            message: "Blogs fetched successfully",
            data : blogs
        })
    }   
})

// READ Blog API -> /blogs/:id (single blog)
app.get("/blogs/:id", async (req,res) => {
    const id = req.params.id
           // const {id} = req.params //ALTERNATIVE

    // const blog = await Blog.find({_id : id})  
    //     if(blog.length == 0){
    //         res.status(300).json({
    //             status: 404,
    //             message : "No blog found"
    //         })
    //     }else{
    //         res.status(300).json({
    //             message:"Blog fetched successfully",
    //             data : blog
    //            })
    //     }

         //ALTERNATIVE
         const blog = await Blog.findById(id)
         if(blog){
            res.status(300).json({
                message : "Blog fetched successfully ",
                data : blog
            })
         }else{
            res.status(404).json({
                message:"No Blog found"
            })
         }
})

// Update Blog API
app.patch("/blogs/:id",async (req,res)=>{
    const id = req.params.id
    
    const title = req.body.title
    const subTitle = req.body.subTitle
    const description = req.body.description

    // const {title, subTitle, description} = req.body //Alternative

        await Blog.findByIdAndUpdate(id, {
            title : title, //title
            subTitle : subTitle, //subTitle 
            description : description //description
        })
    
    res.status(300).json({
        message : "Blog updated successfully"
    })

})

// DELETE API
app.delete("/blogs/:id", async (req,res) => {
    const id = req.params.id // const {id} = req.params
    
        await Blog.findByIdAndDelete(id)
    
    res.status(300).json({
        message : "Blog Deleted successfully"
    })
    
})


app.listen(3000,(req,res)=>{
    console.log("Nodejs has started at port 3000")
})