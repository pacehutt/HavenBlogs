const mongoose=require("mongoose")
const Schema= mongoose.Schema;
const jwt=require("jsonwebtoken")

const userSchema=new Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true, 
            unique:true
        }, 
        password:{
            type:String,
            required:true
        },
        confirm_password:{
            type:String,
            required:true
        },
        tokens:[{
            token:{
                type:String,
                required:true
            }

        }],
        userBlogs:Array
    },{timestamps:true});


    userSchema.methods.generateAuthToken = function()
    {
        try{
            const newtoken=jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY )
            console.log(newtoken);
            this.tokens =this.tokens.concat({token:newtoken})
            return newtoken;
        }
        catch(err)
        {
            console.log(err+"okey");
        }

    };

    const User=mongoose.model('User',userSchema);
    module.exports = User;
