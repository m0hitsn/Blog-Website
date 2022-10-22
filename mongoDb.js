const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://redak:redak123@cluster0.awcv0mb.mongodb.net/BlogDB");


const blogschema= new mongoose.Schema({
    title:String,
    blogparagraph:String
});

const blog=mongoose.model("blogs",blogschema);

module.exports=blog;