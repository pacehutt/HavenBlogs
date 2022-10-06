const mongoose=require("mongoose")
const Schema= mongoose.Schema;

const blogSchema=new Schema(
    {
        slug:String,
        email:String,
        date:String,
        blogs:Array
    },{timestamps:true}
)
const Blog=mongoose.model('Blog',blogSchema);
module.exports= Blog;