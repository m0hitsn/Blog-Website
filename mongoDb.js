const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/BlogDB");


const blogschema= new mongoose.Schema({
    title:String,
    blogparagraph:String
});

const blog=mongoose.model("blogs",blogschema);

module.exports=blog;