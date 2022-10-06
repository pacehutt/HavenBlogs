const mongoose=require("mongoose")
const Schema= mongoose.Schema;

const feedbackSchema=new Schema(
    {   
        name:String,
        email:String,
        feedback:String
    },{timestamps:true}
)
const feedback=mongoose.model('Feedbacks',feedbackSchema);
module.exports= feedback;