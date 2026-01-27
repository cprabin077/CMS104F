
const mongoose = require("mongoose");

exports.connectDatabase = async()=>{
    //Connecting to database
    //jaba samma database sanga connect hudaina wait gar..
await mongoose.connect("mongodb+srv://CMS104F_db:CMS104F_db@cluster0.1o3topq.mongodb.net/?appName=Cluster0")
    
console.log("Database connected successfully")

}